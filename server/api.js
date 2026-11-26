import { createHash, createHmac, randomBytes, randomInt, timingSafeEqual } from 'node:crypto';
import { Buffer } from 'node:buffer';
import process from 'node:process';
import nodemailer from 'nodemailer';
import { byId, priceFor } from '../ecommerce/src/products.js';

const rupees = value => `Rs. ${value.toLocaleString('en-IN')}`;

const DESTINATION = 'paradise.enterprises.co.in@gmail.com';
const otpChallenges = new Map();
const sessions = new Map();
const requestCounts = new Map();
const OTP_LIFE = 10 * 60 * 1000;
const SESSION_LIFE = 7 * 24 * 60 * 60 * 1000;

const clean = (value, limit) => typeof value === 'string' ? value.trim().slice(0, limit) : '';
const emailOkay = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
const html = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const digest = value => createHash('sha256').update(value).digest();

const configured = () => {
  if (!process.env.SMTP_APP_PASSWORD) {
    try { process.loadEnvFile('.env'); } catch { /* Ignore */ }
  }
  return Boolean(process.env.SMTP_USER && process.env.SMTP_APP_PASSWORD);
};

function mailer() {
  if (!process.env.SMTP_APP_PASSWORD) {
    try { process.loadEnvFile('.env'); } catch { /* Ignore */ }
  }
  return nodemailer.createTransport({ host: 'smtp.gmail.com', port: 465, secure: true, auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_APP_PASSWORD } });
}

const getSecret = () => process.env.SESSION_SECRET || process.env.SMTP_APP_PASSWORD || 'paradise-secret-salt';

function signOtpToken(email, name, otp, expires) {
  const hmac = createHmac('sha256', getSecret()).update(`${email}|${name}|${otp}|${expires}`).digest('hex');
  return `${expires}.${Buffer.from(name).toString('base64url')}.${hmac}`;
}

function verifyOtpToken(token, email, otp) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [expiresStr, nameB64, hmac] = parts;
  const expires = Number(expiresStr);
  if (!Number.isFinite(expires) || Date.now() > expires) return null;
  const name = Buffer.from(nameB64, 'base64url').toString('utf8');
  const expectedHmac = createHmac('sha256', getSecret()).update(`${email}|${name}|${otp}|${expires}`).digest('hex');
  if (hmac.length !== expectedHmac.length) return null;
  if (!timingSafeEqual(Buffer.from(hmac, 'hex'), Buffer.from(expectedHmac, 'hex'))) return null;
  return { name, email };
}

function signSessionToken(name, email, expires) {
  const hmac = createHmac('sha256', getSecret()).update(`${name}|${email}|${expires}`).digest('hex');
  return `${expires}.${Buffer.from(name).toString('base64url')}.${Buffer.from(email).toString('base64url')}.${hmac}`;
}

function verifySessionToken(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 4) return null;
  const [expiresStr, nameB64, emailB64, hmac] = parts;
  const expires = Number(expiresStr);
  if (!Number.isFinite(expires) || Date.now() > expires) return null;
  const name = Buffer.from(nameB64, 'base64url').toString('utf8');
  const email = Buffer.from(emailB64, 'base64url').toString('utf8');
  const expectedHmac = createHmac('sha256', getSecret()).update(`${name}|${email}|${expires}`).digest('hex');
  if (hmac.length !== expectedHmac.length) return null;
  if (!timingSafeEqual(Buffer.from(hmac, 'hex'), Buffer.from(expectedHmac, 'hex'))) return null;
  return { name, email, expires };
}

function json(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
  res.end(JSON.stringify(body));
}

async function body(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  let raw = '';
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 20_000) throw new Error('Request is too large.');
  }
  return JSON.parse(raw || '{}');
}

function cookie(req, name) {
  return req.headers.cookie?.split(';').map(value => value.trim()).find(value => value.startsWith(`${name}=`))?.slice(name.length + 1);
}

function sessionFor(req) {
  const token = cookie(req, 'paradise_session');
  if (!token) return null;
  const memoryEntry = sessions.get(digest(token).toString('hex'));
  if (memoryEntry && memoryEntry.expires >= Date.now()) return memoryEntry;
  const tokenEntry = verifySessionToken(token);
  if (tokenEntry) return tokenEntry;
  return null;
}

function sameOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return false;
  try {
    const originHost = new URL(origin).host;
    const reqHost = req.headers['x-forwarded-host'] || req.headers.host;
    if (!reqHost) return true;
    if (originHost === reqHost) return true;
    if (originHost.endsWith('.vercel.app') && reqHost.endsWith('.vercel.app')) return true;
    return false;
  } catch { return false; }
}

function limit(key, max, windowMs) {
  const now = Date.now();
  const current = requestCounts.get(key);
  const next = !current || current.until < now ? { count: 1, until: now + windowMs } : { count: current.count + 1, until: current.until };
  requestCounts.set(key, next);
  return next.count <= max;
}

function expireRecords() {
  const now = Date.now();
  for (const [key, value] of otpChallenges) if (value.expires < now) otpChallenges.delete(key);
  for (const [key, value] of sessions) if (value.expires < now) sessions.delete(key);
  for (const [key, value] of requestCounts) if (value.until < now) requestCounts.delete(key);
}

export async function handleApi(req, res, sendEmail = message => mailer().sendMail(message)) {
  const path = new URL(req.url, 'http://localhost').pathname;
  if (!path.startsWith('/api/')) return false;
  expireRecords();
  if (req.method === 'GET' && path === '/api/auth/status') {
    const session = sessionFor(req);
    json(res, 200, { configured: configured(), user: session ? { name: session.name, email: session.email } : null });
    return true;
  }
  if (req.method !== 'POST' || !sameOrigin(req)) { json(res, 403, { error: 'Request not allowed.' }); return true; }
  if (!configured()) { json(res, 503, { error: 'Email verification is being set up. Please try again soon.' }); return true; }

  let data;
  try { data = await body(req); } catch { json(res, 400, { error: 'Please check your form and try again.' }); return true; }
  const ip = req.socket?.remoteAddress || req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 'unknown';

  if (path === '/api/auth/start') {
    const name = clean(data.name, 80);
    const email = clean(data.email, 254).toLowerCase();
    if (name.length < 2 || !emailOkay(email)) { json(res, 400, { error: 'Enter your name and a valid email address.' }); return true; }
    if (!limit(`otp-ip:${ip}`, 12, 60 * 60 * 1000) || !limit(`otp-email:${email}`, 5, 60 * 60 * 1000)) { json(res, 429, { error: 'Too many verification requests. Please try again later.' }); return true; }
    const previous = otpChallenges.get(email);
    if (previous && Date.now() - previous.sentAt < 60_000) { json(res, 429, { error: 'Please wait one minute before requesting another code.' }); return true; }
    const otp = String(randomInt(100000, 1000000));
    const salt = randomBytes(16).toString('hex');
    try {
      await sendEmail({ from: `Paradise Enterprise <${process.env.SMTP_USER}>`, to: email, subject: 'Your Paradise Enterprise verification code', text: `Hello ${name},\n\nYour verification code is ${otp}. It expires in 10 minutes.\n\nIf you did not request this code, you can ignore this email.\n\nParadise Enterprise`, html: `<div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;color:#1d2a43"><div style="background:#3158ed;color:white;padding:24px;border-radius:12px 12px 0 0"><strong style="font-size:20px">Paradise Enterprise</strong><div style="font-size:12px;margin-top:5px">ONLINE STORE</div></div><div style="padding:28px;border:1px solid #e3e9f2;border-radius:0 0 12px 12px"><h1 style="font-size:23px;margin:0 0 12px">Verify your email</h1><p>Hello ${html(name)},</p><p>Use this code to continue your quote request:</p><div style="font-size:32px;font-weight:800;letter-spacing:8px;color:#3158ed;padding:14px 0">${otp}</div><p style="font-size:13px;color:#68788c">This code expires in 10 minutes. If you did not request it, ignore this email.</p></div></div>` });
    } catch (error) { console.error('OTP email failed:', error); json(res, 502, { error: 'We could not send the code right now. Please try again later.' }); return true; }
    otpChallenges.set(email, { name, hash: digest(`${salt}:${otp}`), salt, expires: Date.now() + OTP_LIFE, attempts: 0, sentAt: Date.now() });
    const otpToken = signOtpToken(email, name, otp, Date.now() + OTP_LIFE);
    const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
    res.setHeader('Set-Cookie', `paradise_otp=${otpToken}; HttpOnly; SameSite=Lax; Path=/api/auth; Max-Age=${OTP_LIFE / 1000}${secure}`);
    json(res, 200, { message: 'A verification code has been sent to your email.' });
    return true;
  }

  if (path === '/api/auth/verify') {
    const email = clean(data.email, 254).toLowerCase();
    const otp = clean(data.otp, 6);
    let verifiedUser = null;
    const entry = otpChallenges.get(email);
    if (entry && /^\d{6}$/.test(otp) && entry.expires >= Date.now() && entry.attempts < 5) {
      entry.attempts++;
      if (timingSafeEqual(entry.hash, digest(`${entry.salt}:${otp}`))) {
        verifiedUser = { name: entry.name, email };
        otpChallenges.delete(email);
      }
    }
    if (!verifiedUser) {
      const otpCookie = cookie(req, 'paradise_otp');
      verifiedUser = verifyOtpToken(otpCookie, email, otp);
    }
    if (!verifiedUser) {
      json(res, 400, { error: 'The code is invalid or has expired. Request a new one.' });
      return true;
    }
    const sessionExpires = Date.now() + SESSION_LIFE;
    const sessionToken = signSessionToken(verifiedUser.name, email, sessionExpires);
    sessions.set(digest(sessionToken).toString('hex'), { name: verifiedUser.name, email, expires: sessionExpires });
    const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
    res.setHeader('Set-Cookie', [
      `paradise_session=${sessionToken}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${SESSION_LIFE / 1000}${secure}`,
      `paradise_otp=; HttpOnly; SameSite=Lax; Path=/api/auth; Max-Age=0${secure}`
    ]);
    json(res, 200, { user: { name: verifiedUser.name, email } });
    return true;
  }

  if (path === '/api/quote') {
    const session = sessionFor(req);
    if (!session) { json(res, 401, { error: 'Please verify your email before sending a quote request.' }); return true; }
    if (!limit(`quote:${session.email}`, 6, 60 * 60 * 1000)) { json(res, 429, { error: 'Too many quote requests. Please try again later.' }); return true; }
    const phone = clean(data.phone, 25);
    const city = clean(data.city, 80);
    const note = clean(data.note, 500);
    const items = Array.isArray(data.items) ? data.items.slice(0, 30).map(item => ({ product: Object.hasOwn(byId, item.id) ? byId[item.id] : null, quantity: item.quantity, size: clean(item.size, 100) })) : [];
    if (!/^[+0-9 ()-]{10,25}$/.test(phone) || city.length < 2 || !items.length || items.some(item => !item.product || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 99 || (item.product.options && priceFor(item.product.id, item.size) === null))) { json(res, 400, { error: 'Please check the quote details and try again.' }); return true; }
    // Prices always come from the catalogue, never from the browser.
    for (const item of items) item.unitPrice = priceFor(item.product.id, item.size);
    const priced = items.filter(item => item.unitPrice !== null);
    const total = priced.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const totalLabel = priced.length === items.length ? 'Estimated total' : 'Estimated total (priced items only; others on request)';
    const ref = `PE-${new Date().toISOString().slice(0, 10).replaceAll('-', '')}-${randomInt(1000, 10000)}`;
    const lines = items.map((item, index) => `${index + 1}. ${item.product.name} — Quantity: ${item.quantity}${item.size ? ` — Size/specification: ${item.size}` : ''} — ${item.unitPrice === null ? 'Price: on request' : `Price: ${rupees(item.unitPrice)} each, ${rupees(item.unitPrice * item.quantity)} total`}`);
    const text = `NEW QUOTE REQUEST\nReference: ${ref}\n\nCustomer\nName: ${session.name}\nEmail: ${session.email}\nPhone: ${phone}\nCity/area: ${city}\n\nProducts\n${lines.join('\n')}\n${priced.length ? `\n${totalLabel}: ${rupees(total)} (listed prices; final price, delivery and payment to be confirmed)\n` : ''}\nAdditional details: ${note || 'None provided'}\n\nPlease reply to the customer with availability, pricing, delivery and payment details.`;
    const rows = items.map(item => `<tr><td style="padding:12px;border-bottom:1px solid #e5eaf2">${html(item.product.name)}${item.size ? `<div style="color:#68788c;font-size:12px;margin-top:4px">${html(item.size)}</div>` : ''}</td><td style="padding:12px;border-bottom:1px solid #e5eaf2;text-align:center">${item.quantity}</td><td style="padding:12px;border-bottom:1px solid #e5eaf2;color:#3158ed;font-weight:700">${item.unitPrice === null ? 'On request' : `${html(rupees(item.unitPrice * item.quantity))}<div style="color:#68788c;font-size:12px;font-weight:400">${html(rupees(item.unitPrice))} each</div>`}</td></tr>`).join('') + (priced.length ? `<tr><td colspan="2" style="padding:12px;font-weight:700">${html(totalLabel)}</td><td style="padding:12px;color:#3158ed;font-weight:800">${html(rupees(total))}</td></tr>` : '');
    const htmlBody = `<div style="background:#f4f7fc;padding:28px;font-family:Arial,sans-serif;color:#1d2a43"><div style="max-width:640px;margin:auto;background:#fff;border-radius:12px;overflow:hidden"><div style="background:#3158ed;color:#fff;padding:25px 30px"><div style="font-size:13px;letter-spacing:2px">PARADISE ENTERPRISE</div><h1 style="font-size:25px;margin:10px 0 0">New quote request</h1><div style="font-size:12px;margin-top:8px;color:#dbe3ff">Reference ${html(ref)}</div></div><div style="padding:26px 30px"><h2 style="font-size:17px">Customer details</h2><p style="line-height:1.8;font-size:14px"><strong>Name:</strong> ${html(session.name)}<br><strong>Email:</strong> <a href="mailto:${html(session.email)}">${html(session.email)}</a><br><strong>Phone:</strong> ${html(phone)}<br><strong>City / area:</strong> ${html(city)}</p><h2 style="font-size:17px;margin-top:28px">Requested products</h2><table style="width:100%;border-collapse:collapse;font-size:14px"><thead><tr style="background:#eef3ff"><th style="padding:12px;text-align:left">Product & specification</th><th style="padding:12px">Qty</th><th style="padding:12px;text-align:left">Price</th></tr></thead><tbody>${rows}</tbody></table><h2 style="font-size:17px;margin-top:28px">Additional details</h2><p style="font-size:14px;line-height:1.7;white-space:pre-wrap">${html(note || 'None provided')}</p><div style="padding:14px;background:#eef8f6;border-radius:7px;font-size:12px;color:#356b63">The customer verified their email address before submitting this request. Reply with availability, pricing, delivery and payment details.</div></div></div></div>`;
    try { await sendEmail({ from: `Paradise Enterprise <${process.env.SMTP_USER}>`, to: DESTINATION, replyTo: session.email, subject: `Quote request ${ref} — ${session.name}`, text, html: htmlBody }); }
    catch (error) { console.error('Quote email failed:', error); json(res, 502, { error: 'Your request could not be sent. Please try again.' }); return true; }
    json(res, 200, { reference: ref });
    return true;
  }

  json(res, 404, { error: 'Not found.' });
  return true;
}
