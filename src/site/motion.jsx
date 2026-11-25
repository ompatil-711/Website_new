import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { motion, useInView, animate } from 'framer-motion';

export const Arrow = () => <svg className="m-arrow" viewBox="0 0 20 8" aria-hidden="true"><path d="M0 4h17M13 1l4 3-4 3" /></svg>;
export const ease = [.16, 1, .3, 1];

/* headline that rises word by word out of a mask. accent = words shown in the brand colour */
export function Split({ text, as = 'h2', accent = [], className = '', delay = 0, onLoad = false }) {
  const Tag = as; const still = useStill();
  const words = text.split(' ');
  const ref = useRef(null); const seen = useInView(ref, { once: true, amount: .4 });
  const show = onLoad || seen;
  return <Tag ref={ref} className={`split ${className}`} aria-label={text}>
    {words.map((w, i) => <span key={i}><span className="split__w" aria-hidden="true">
      <motion.span className={'split__i' + (accent.includes(w.replace(/[.,]/g, '')) ? ' acc' : '')}
        initial={false} animate={{ y: still || show ? '0%' : '115%' }} transition={{ duration: .9, delay: delay + i * .06, ease }}>{w}</motion.span>
    </span>{' '}</span>)}
  </Tag>;
}

/* fade and lift, used sparingly on blocks */
export function Reveal({ children, delay = 0, y = 28, className = '', as = 'div' }) {
  const still = useStill(); const Tag = motion[as];
  if (still) return <Tag className={className}>{children}</Tag>;
  return <Tag className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .8, delay, ease }}>{children}</Tag>;
}

export function Count({ to, suffix = '' }) {
  const ref = useRef(null); const inView = useInView(ref, { once: true }); const still = useStill();
  const [v, setV] = useState(0); const started = useRef(false);
  useEffect(() => {
    if (!inView || started.current) return; started.current = true;
    if (still) { setV(to); return; }
    animate(0, to, { duration: 1.8, ease, onUpdate: x => setV(Math.round(x)), onComplete: () => setV(to) });
  }, [inView, to, still]);
  return <span ref={ref}>{v}{suffix}</span>;
}

/* flat dot grid that reacts to the cursor: dots swell, turn blue and are pushed aside; a click sends a ripple */
export function DotField({ tone = "dark" }) {
  const ref = useRef(null); const still = useStill();
  useEffect(() => {
    const c = ref.current; const host = c.parentElement; const ctx = c.getContext('2d');
    const gap = 30; let w = 0, h = 0, raf = 0, live = true; const m = { x: -999, y: -999 }; const ripples = [];
    let rgb = '11,110,122', base = 'rgba(18,41,46,.18)';
    const toRgb = hex => { const n = parseInt(hex.replace('#', '').padEnd(6, '0'), 16); return `${n >> 16 & 255},${n >> 8 & 255},${n & 255}`; };
    const readTheme = () => { if (tone === 'light') { rgb = toRgb(cssVar('--sun') || '#c8d8e4'); base = 'rgba(255,255,255,.17)'; return; } rgb = toRgb(cssVar('--cool') || '#52ab98'); base = `rgba(${toRgb(cssVar('--ink') || '#2b6777')},.18)`; };
    readTheme(); window.addEventListener('pe-theme', readTheme);
    const fit = () => { const r = c.getBoundingClientRect(); const d = Math.min(window.devicePixelRatio || 1, 2); w = r.width; h = r.height; c.width = w * d; c.height = h * d; ctx.setTransform(d, 0, 0, d, 0, 0); if (still) draw(); };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let x = gap / 2; x < w; x += gap) for (let y = gap / 2; y < h; y += gap) {
        const dx = x - m.x, dy = y - m.y, d = Math.hypot(dx, dy) || 1;
        let k = Math.max(0, 1 - d / 180);
        for (const r of ripples) { const band = Math.abs(Math.hypot(x - r.x, y - r.y) - r.r); if (band < 70) k += (1 - band / 70) * r.a; }
        k = Math.min(k, 1.4);
        const push = k * 9;
        ctx.beginPath(); ctx.arc(x + dx / d * push, y + dy / d * push, 1.3 + k * 3.4, 0, 6.2832);
        ctx.fillStyle = k > .02 ? `rgba(${rgb},${Math.min(.2 + k * .8, 1)})` : base; ctx.fill();
      }
      for (let i = ripples.length - 1; i >= 0; i--) { ripples[i].r += 10; ripples[i].a -= .013; if (ripples[i].a <= 0) ripples.splice(i, 1); }
    };
    const loop = () => { if (live) draw(); raf = requestAnimationFrame(loop); };
    const move = e => { const r = c.getBoundingClientRect(); m.x = e.clientX - r.left; m.y = e.clientY - r.top; };
    const leave = () => { m.x = m.y = -999; };
    const click = e => { const r = c.getBoundingClientRect(); ripples.push({ x: e.clientX - r.left, y: e.clientY - r.top, r: 0, a: 1 }); };
    fit(); const ro = new ResizeObserver(fit); ro.observe(c);
    if (still) return () => ro.disconnect();
    const io = new IntersectionObserver(([e]) => { live = e.isIntersecting; }); io.observe(c);
    host.addEventListener('pointermove', move); host.addEventListener('pointerleave', leave); host.addEventListener('pointerdown', click);
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener('pe-theme', readTheme); cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); host.removeEventListener('pointermove', move); host.removeEventListener('pointerleave', leave); host.removeEventListener('pointerdown', click); };
  }, [still]);
  return <canvas ref={ref} className="dots" aria-hidden="true" />;
}

/* Colour themes (variables live in site.css). The choice is remembered and applied before first paint by index.html. */
export const themes = [
  ['teal', 'Teal and yellow', '#0b6e7a', '#0e3b43'], ['forest', 'Forest green', '#1e7a4c', '#143d2b'],
  ['crimson', 'School crimson', '#b3202a', '#2f3a45'], ['rose', 'Rose and slate', '#c2185b', '#33414f'], ['ocean', 'Ocean', '#0a7ea4', '#0b3954'],
];
const TKEY = 'pe-theme'; const tsubs = new Set();
const readTheme = () => { try { const t = localStorage.getItem(TKEY); return themes.some(x => x[0] === t) ? t : 'teal'; } catch { return 'teal'; } };
export function setTheme(id) {
  try { localStorage.setItem(TKEY, id); } catch { /* private mode */ }
  const root = document.documentElement; root.classList.add('theming'); root.dataset.theme = id;
  setTimeout(() => root.classList.remove('theming'), 700);
  tsubs.forEach(f => f()); window.dispatchEvent(new Event('pe-theme'));
}
export function useTheme() { return useSyncExternalStore(f => { tsubs.add(f); return () => tsubs.delete(f); }, readTheme, () => 'teal'); }
export const cssVar = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();

/* Motion preference. The site animates by default (the owner wants the full experience, whatever the OS says);
   visitors can switch to a still page with the footer toggle, which is remembered. */
const KEY = 'pe-still'; const subs = new Set();
const read = () => { try { return localStorage.getItem(KEY) === '1'; } catch { return false; } };
export function setStill(v) {
  try { localStorage.setItem(KEY, v ? '1' : '0'); } catch { /* private mode */ }
  document.documentElement.toggleAttribute('data-still', v); subs.forEach(f => f());
}
export function useStill() { return useSyncExternalStore(f => { subs.add(f); return () => subs.delete(f); }, read, () => false); }
