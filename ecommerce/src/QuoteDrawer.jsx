import { useEffect, useRef, useState } from 'react';
import BoardVisual from './BoardVisual';
import { byId } from './products';
import { Icon, QuantityControl } from './StoreApp';

async function api(path, options) {
  const response = await fetch(path, { credentials: 'same-origin', ...options, headers: { 'Content-Type': 'application/json', ...options?.headers } });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Please try again.');
  return data;
}

export default function QuoteDrawer({ items, step, onStep, onClose, onQuantity, onSize, onRemove, onSuccess }) {
  const dialog = useRef(null);
  const [identity, setIdentity] = useState({ name: '', email: '' });
  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState('');
  const [customer, setCustomer] = useState({ phone: '', city: '', note: '' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [reference, setReference] = useState('');

  useEffect(() => {
    api('/api/auth/status').then(data => { setUser(data.user); if (data.user) setIdentity(data.user); }).catch(() => {});
  }, []);
  useEffect(() => { if (step === 'login' && user) onStep('checkout'); }, [step, user, onStep]);
  useEffect(() => {
    const previous = document.activeElement;
    dialog.current?.querySelector('button, input')?.focus();
    function trap(event) {
      if (event.key !== 'Tab') return;
      const focusable = [...dialog.current.querySelectorAll('a[href], button:not(:disabled), input:not(:disabled), textarea:not(:disabled)')];
      if (!focusable.length) return;
      if (event.shiftKey && document.activeElement === focusable[0]) { event.preventDefault(); focusable.at(-1).focus(); }
      else if (!event.shiftKey && document.activeElement === focusable.at(-1)) { event.preventDefault(); focusable[0].focus(); }
    }
    dialog.current?.addEventListener('keydown', trap);
    return () => { dialog.current?.removeEventListener('keydown', trap); previous?.focus?.(); };
  }, []);

  function advance() { setError(''); onStep(user ? 'checkout' : 'login'); }
  async function start(event) {
    event.preventDefault(); setBusy(true); setError('');
    try { await api('/api/auth/start', { method: 'POST', body: JSON.stringify(identity) }); onStep('otp'); }
    catch (issue) { setError(issue.message); }
    finally { setBusy(false); }
  }
  async function verify(event) {
    event.preventDefault(); setBusy(true); setError('');
    try { const data = await api('/api/auth/verify', { method: 'POST', body: JSON.stringify({ email: identity.email, otp }) }); setUser(data.user); onStep('checkout'); }
    catch (issue) { setError(issue.message); }
    finally { setBusy(false); }
  }
  async function sendQuote(event) {
    event.preventDefault(); setBusy(true); setError('');
    try { const data = await api('/api/quote', { method: 'POST', body: JSON.stringify({ ...customer, items }) }); setReference(data.reference); onSuccess(); onStep('success'); }
    catch (issue) { if (issue.message.includes('verify your email')) { setUser(null); onStep('login'); } setError(issue.message); }
    finally { setBusy(false); }
  }

  const headings = { cart: 'Quote cart', login: 'Verify your email', otp: 'Enter your code', checkout: 'Send your enquiry', success: 'Request sent' };
  return <div className="overlay drawer-overlay" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}><aside ref={dialog} className="cart-drawer quote-drawer" role="dialog" aria-modal="true" aria-labelledby="quote-title">
    <div className="drawer-head"><div><span className="eyebrow">PARADISE ENTERPRISE</span><h2 id="quote-title">{headings[step] || headings.cart}</h2></div><button className="icon-button" type="button" aria-label="Close quote cart" onClick={onClose}><Icon name="close" /></button></div>
    {step === 'cart' && <><div className="drawer-body">{items.length ? items.map((item, index) => <div className="cart-item" key={`${item.id}-${index}`}><div className={`cart-art visual-${byId[item.id].visual}`}><BoardVisual product={byId[item.id]} /></div><div className="cart-item-copy"><strong>{byId[item.id].name}</strong><span>Price on request</span><label className="field-label" htmlFor={`cart-size-${index}`}>Size / specification</label><input id={`cart-size-${index}`} value={item.size} maxLength={100} placeholder="Optional" onChange={event => onSize(index, event.target.value)} /><div className="cart-row"><QuantityControl value={item.quantity} label={`${byId[item.id].name} quantity`} onChange={value => onQuantity(index, value)} /><button className="text-button" type="button" onClick={() => onRemove(index)}>Remove</button></div></div></div>) : <div className="empty-cart"><span className="empty-cart-icon"><Icon name="bag" size={30}/></span><h3>Your quote cart is empty</h3><p>Explore the collection and add the boards you’re interested in.</p><button type="button" className="button-primary" onClick={onClose}>Browse boards <Icon name="arrow" size={17}/></button></div>}</div>{items.length > 0 && <div className="drawer-foot"><div className="cart-summary"><strong>{items.reduce((sum, item) => sum + item.quantity, 0)} board{items.reduce((sum, item) => sum + item.quantity, 0) === 1 ? '' : 's'} selected</strong><span>Pricing confirmed by our team</span></div><button className="button-primary full" onClick={advance}>Continue to quote request <Icon name="arrow" size={18}/></button></div>}</>}
    {step === 'login' && <><div className="drawer-body quote-auth"><button className="back-step" onClick={() => onStep('cart')}>← Back to cart</button><div className="quote-step-list"><span className="active">1. Verify email</span><span>2. Send request</span></div><h3>First, let’s verify your email.</h3><p>We’ll send a six digit code to your inbox. Once verified, you can send your board quote request.</p><form id="quote-login" onSubmit={start}><label htmlFor="quote-name">Full name</label><input id="quote-name" required minLength={2} maxLength={80} autoComplete="name" value={identity.name} onChange={event => setIdentity({ ...identity, name: event.target.value })} placeholder="Your full name" /><label htmlFor="quote-email">Email address</label><input id="quote-email" required type="email" maxLength={254} autoComplete="email" value={identity.email} onChange={event => setIdentity({ ...identity, email: event.target.value })} placeholder="you@example.com" /></form>{error && <p className="quote-error" role="alert">{error}</p>}</div><div className="drawer-foot"><button className="button-primary full" type="submit" form="quote-login" disabled={busy}>{busy ? 'Sending code…' : 'Send verification code'} <Icon name="arrow" size={18}/></button><small>We use your email only to verify and respond to your request.</small></div></>}
    {step === 'otp' && <><div className="drawer-body quote-auth"><button className="back-step" onClick={() => { setOtp(''); setError(''); onStep('login'); }}>← Change email</button><div className="quote-step-list"><span className="active">1. Verify email</span><span>2. Send request</span></div><h3>Check your inbox</h3><p>Enter the six digit code sent to <strong>{identity.email}</strong>. It expires in 10 minutes.</p><form id="quote-otp" onSubmit={verify}><label htmlFor="quote-code">Verification code</label><input id="quote-code" required inputMode="numeric" pattern="[0-9]{6}" maxLength={6} autoComplete="one-time-code" value={otp} onChange={event => setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="000000" /></form><button className="quote-resend" disabled={busy} onClick={event => start(event)}>Send a new code</button>{error && <p className="quote-error" role="alert">{error}</p>}</div><div className="drawer-foot"><button className="button-primary full" type="submit" form="quote-otp" disabled={busy}>{busy ? 'Verifying…' : 'Verify and continue'} <Icon name="arrow" size={18}/></button></div></>}
    {step === 'checkout' && <><div className="drawer-body quote-checkout"><button className="back-step" onClick={() => onStep('cart')}>← Edit cart</button><div className="quote-step-list"><span>✓ Email verified</span><span className="active">2. Send request</span></div><div className="quote-verified"><strong>{user?.name}</strong><span>{user?.email}</span></div><div className="checkout-summary">{items.map((item, index) => <div key={`${item.id}-${index}`}><span>{byId[item.id].name} × {item.quantity}{item.size ? ` · ${item.size}` : ''}</span><strong>Quote</strong></div>)}</div><p className="checkout-intro">We’ll send your request to Paradise Enterprise and reply to your verified email with pricing and availability.</p><form id="quote-send" onSubmit={sendQuote}><label htmlFor="quote-phone">Phone number *</label><input id="quote-phone" required type="tel" pattern="[+0-9 ()-]{10,25}" maxLength={25} autoComplete="tel" value={customer.phone} onChange={event => setCustomer({ ...customer, phone: event.target.value })} placeholder="+91 00000 00000" /><label htmlFor="quote-city">City / delivery area *</label><input id="quote-city" required minLength={2} maxLength={80} autoComplete="address-level2" value={customer.city} onChange={event => setCustomer({ ...customer, city: event.target.value })} placeholder="City or area" /><label htmlFor="quote-note">More details <small>Optional</small></label><textarea id="quote-note" maxLength={500} rows={4} value={customer.note} onChange={event => setCustomer({ ...customer, note: event.target.value })} placeholder="Installation, preferred timeline or anything else…" /></form>{error && <p className="quote-error" role="alert">{error}</p>}</div><div className="drawer-foot"><button className="button-primary full" type="submit" form="quote-send" disabled={busy || !items.length}>{busy ? 'Sending request…' : 'Email my quote request'} <Icon name="arrow" size={18}/></button><small>No payment is collected. Our team will confirm the quote by email.</small></div></>}
    {step === 'success' && <div className="drawer-body quote-success"><span className="quote-success-icon">✓</span><h3>Request sent successfully</h3><p>Your board requirements have been emailed to Paradise Enterprise. We’ll respond to <strong>{user?.email}</strong> with your quote.</p><div>Reference <strong>{reference}</strong></div><button className="button-primary" onClick={onClose}>Continue browsing <Icon name="arrow" size={18}/></button></div>}
  </aside></div>;
}
