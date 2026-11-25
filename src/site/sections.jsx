import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, animate, motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';
import Slot from './Slot';
import { Arrow, Count, Reveal, Split, ease, useStill } from './motion';
import ProductImage from '../../ecommerce/src/ProductImage';
import { products, byId, startingPrice, formatPrice } from '../../ecommerce/src/products';

const PHONE_1 = '+91 99224 04078';
const PHONE_2 = '+91 98225 71372';
const EMAIL = 'paradisenterprises.dahikar@gmail.com';
const MAPS = 'https://www.google.com/maps/place/Dahikar+catering/@21.1565489,79.1037932,19.86z';
const INSTAGRAM = 'https://www.instagram.com/deepdahikar986/';

const Label = ({ n, children }) => <span className="label label--sec"><b>{n}</b>{children}</span>;

/* ───────── header: solid teal bar with a sliding active-section pill ───────── */
/* Logo: a "P" whose bowl is a board, with a marker resting under it */
export function LogoMark({ tone = 'white' }) {
  return <svg className={'lmark lmark--' + tone} viewBox="0 0 48 48" aria-hidden="true">
    <rect className="lmark__bg" width="48" height="48" rx="12" />
    <path className="lmark__g" fillRule="evenodd" d="M13 38V10h13a10 10 0 0 1 0 20h-5.5v8zM20.5 16v8H26a4 4 0 0 0 0-8z" />
    <rect className="lmark__acc" x="26" y="33" width="10" height="5" rx="2.5" />
  </svg>;
}
const nav = [['range', 'Boards'], ['install', 'Process'], ['price', 'Pricing'], ['about', 'About'], ['faq', 'FAQ']];
export function Header() {
  const [open, setOpen] = useState(false); const [stuck, setStuck] = useState(false); const [active, setActive] = useState('');
  const { scrollYProgress } = useScroll();
  useEffect(() => { const f = () => setStuck(window.scrollY > 8); f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f); }, []);
  /* highlight the link of the section that is in the middle of the screen */
  useEffect(() => {
    const ids = nav.map(n => n[0]);
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ids.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
    const top = document.getElementById('top');
    const io2 = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(''); }, { rootMargin: '-45% 0px -50% 0px' });
    if (top) io2.observe(top);
    return () => { io.disconnect(); io2.disconnect(); };
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const key = e => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', key);
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', key); };
  }, [open]);
  return <header className={'hdr' + (stuck ? ' is-stuck' : '')}>
    <div className="wrap hdr__row">
      <a className="skip-link" href="#main">Skip to content</a>
      <a className="logo" href="#top" onClick={() => setOpen(false)}>
        <LogoMark />
        <span className="logo__text"><b>Paradise<em> Enterprise</em></b><small>Est. 2001 · Nagpur</small></span>
      </a>
      <nav className="hdr__links" aria-label="Main">
        {[...nav, ['shop', 'Shop']].map(([id, label]) => {
          const on = active === id;
          return <a key={id} className={'nl' + (on ? ' is-active' : '')} href={id === 'shop' ? '/ecommerce/' : `#${id}`} aria-current={on ? 'true' : undefined}>
            {on && <motion.span className="nl__pill" layoutId="navpill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
            <span className="nl__t">{label}</span>
          </a>;
        })}
      </nav>
      <a className="btn btn--light btn--sm hdr__cta" href="#contact">Request a quote <Arrow /></a>
      <button className="hdr__toggle" type="button" aria-expanded={open} aria-controls="sheet" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}><span /><span /></button>
    </div>
    <motion.i className="progress" style={{ scaleX: scrollYProgress }} />
    <div id="sheet" className={'sheet' + (open ? ' is-open' : '')} hidden={!open}>
      {[...nav, ['contact', 'Request a quote']].map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}
      <a href="/ecommerce/" onClick={() => setOpen(false)}>Shop</a>
      <a href="tel:+919922404078" className="sheet__call">Call {PHONE_1}</a>
    </div>
  </header>;
}

/* mobile: a fixed bottom bar with the two things a phone visitor wants, call and quote */
export function MobileBar() {
  const [passed, setPassed] = useState(false); const [atForm, setAtForm] = useState(false);
  useEffect(() => {
    const f = () => setPassed(window.scrollY > window.innerHeight * .6);
    f(); window.addEventListener('scroll', f, { passive: true });
    const el = document.getElementById('contact');
    const io = new IntersectionObserver(([e]) => setAtForm(e.isIntersecting), { threshold: .12 });
    if (el) io.observe(el);
    return () => { window.removeEventListener('scroll', f); io.disconnect(); };
  }, []);
  return <div className={'mbar' + (passed && !atForm ? ' is-on' : '')} role="region" aria-label="Quick actions">
    <a className="btn btn--ghost btn--sm mbar__call" href="tel:+919922404078">Call us</a>
    <a className="btn btn--light btn--sm mbar__quote" href="#contact">Request a quote <Arrow /></a>
  </div>;
}

/* ───────── marquee ───────── */
const tags = ['Whiteboards', 'Greenboards', 'Notice boards', 'Magnetic boards', 'Ceramic boards', 'Digital boards', 'Drawing boards', 'School furniture', 'Lab set-ups'];
export function Marquee() {
  return <div className="marquee" aria-label="What we make">
    <div className="marquee__row">{[0, 1].map(k => <ul key={k} className="marquee__track" aria-hidden={k ? 'true' : undefined}>{tags.map(t => <li key={t}>{t}<i /></li>)}</ul>)}</div>
  </div>;
}

/* ───────── range: the section colour, the showcase and the details all change as you scroll ───────── */
const showcase = [
  { id: 'whiteboard', look: ['--deep', 1, '--cool'], line: 'Bright, clean writing for every room.', points: ['A smooth surface that takes markers and wipes clean', 'Wall-sized options up to 4 × 12 ft', 'Suits classrooms, meeting rooms and offices'] },
  { id: 'greenboard', look: ['--bg', 0, '--deep'], line: 'The classroom standard, made to last.', points: ['A chalk surface in a calm, easy-on-the-eyes green', 'Same size range and prices as the whiteboard', 'Fitted level and secure on your wall'] },
  { id: 'chalkboard', look: ['--deep', 1, '--sun'], line: 'Classic chalk, no fuss.', points: ['A traditional chalk writing surface', 'Good for lessons, announcements and practice', 'Tell us the wall size and we confirm the price'] },
  { id: 'pinup-notice', look: ['--sun', 0, '--deep'], line: 'Keep every notice in view.', points: ['A pin-up surface for circulars and timetables', 'Works in corridors, staff rooms and offices', 'Made to the width of your wall'] },
  { id: 'magnetic', look: ['--deep', 1, '--cool'], line: 'Notes, charts and teaching aids, held in place.', points: ['A magnetic face that grips ordinary magnets', 'Handy for planning boards and lesson displays', 'Available in the standard writing-board sizes'] },
  { id: 'ceramic', look: ['--bg', 0, '--deep'], line: 'A hard, smooth face for daily use.', points: ['A durable ceramic surface for busy rooms', 'Suits offices and institutions that write every day', 'Clean, professional finish'] },
  { id: 'digital', look: ['--deep', 1, '--sun'], line: 'Interactive displays for modern classrooms.', points: ['Large panels for presentations and teaching', 'Available in 75 and 85 inch sizes', 'Supplied, installed and supported by our team'] },
];
const goTo = id => { const t = document.getElementById(`rng-${id}`); if (!t) return; window.__lenis ? window.__lenis.scrollTo(t, { offset: -(window.innerHeight * .25) }) : t.scrollIntoView({ behavior: 'smooth', block: 'center' }); };
const itemV = { off: {}, on: { transition: { staggerChildren: .08, delayChildren: .05 } } };
const partV = { off: { opacity: 0, y: 22 }, on: { opacity: 1, y: 0, transition: { duration: .7, ease } } };
const soft = { stiffness: 70, damping: 22, mass: .6 };

/* one board's text block: tilts and fades continuously with the scroll, so it feels like it turns past you */
function RngItem({ s, i, a, setA, still }) {
  const ref = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const sp = useSpring(p, soft);
  const rotateX = useTransform(sp, [0, .5, 1], [16, 0, -16]);
  const y = useTransform(sp, [0, .5, 1], [70, 0, -70]);
  const scale = useTransform(sp, [0, .5, 1], [.9, 1, .9]);
  const opacity = useTransform(sp, [0, .3, .5, .7, 1], [.04, .8, 1, .8, .04]);
  const q = byId[s.id]; const f = startingPrice(q); const shown = q.options ? q.options.slice(0, 6) : [];
  return <motion.li ref={ref} id={`rng-${s.id}`} variants={itemV} initial="off" animate={i === a ? 'on' : 'off'} onViewportEnter={() => setA(i)} viewport={{ margin: '-40% 0px -40% 0px' }}
    style={still || window.matchMedia('(max-width:1100px)').matches ? undefined : { rotateX, y, scale, opacity, transformPerspective: 1100, transformOrigin: '50% 50%' }}>
    <div className="rng__thumb" aria-hidden="true" style={{ background: `color-mix(in srgb, var(${s.look[2]}) 26%, #ffffff)` }}><ProductImage product={q} /></div>
    <span className="rng__n">{String(i + 1).padStart(2, '0')}</span>
    <div>
      <motion.span className="rng__cat" variants={partV}>{q.category}{q.tag ? ` · ${q.tag}` : ''}</motion.span>
      <h3>{q.name}</h3>
      <motion.p className="rng__line" variants={partV}>{s.line}</motion.p>
      <motion.ul className="rng__points" variants={partV}>{s.points.map(t => <li key={t}>{t}</li>)}</motion.ul>
      {shown.length > 0 && <motion.div className="rng__sizes" variants={partV}>
        <span>Sizes</span>{shown.map(o => <i key={o.label}>{o.label}</i>)}{q.options.length > shown.length && <i className="more-chip">+{q.options.length - shown.length} more</i>}
      </motion.div>}
      <motion.div className="rng__uses" variants={partV}><span>Best for</span>{q.uses.map(u => <i key={u}>{u}</i>)}</motion.div>
      <motion.a className="btn btn--ghost" variants={partV} href={`/ecommerce/#product/${s.id}`}>{f ? `From ${formatPrice(f)}` : 'Price on request'} · View in shop <Arrow /></motion.a>
    </div>
  </motion.li>;
}

export function Range() {
  const [a, setA] = useState(0); const still = useStill();
  const listRef = useRef(null);
  const cur = showcase[a]; const p = byId[cur.id]; const from = startingPrice(p);
  const [secBg, dark, panelBg] = cur.look;
  /* the product in the panel turns with the scroll: flat-on when a board is in focus, swung away between boards */
  const { scrollYProgress: lp } = useScroll({ target: listRef, offset: ['start 62%', 'end 38%'] });
  const slp = useSpring(lp, soft);
  const turn = useTransform(slp, v => Math.cos(v * showcase.length * Math.PI) * 26);
  const lift = useTransform(slp, v => Math.cos(v * showcase.length * Math.PI) * -10);
  const drift = useTransform(slp, v => Math.sin(v * showcase.length * Math.PI) * 30);
  const ghostY = useTransform(slp, [0, 1], [60, -60]);
  const shadowScale = useTransform(slp, v => 1 - Math.abs(Math.cos(v * showcase.length * Math.PI)) * .28);
  return <section className={'section range' + (dark ? ' range--dark' : '') + (secBg === '--sun' ? ' range--mist' : '')} id="range" style={{ backgroundColor: `var(${secBg})`, '--sec': `var(${secBg})` }}>
    <div className="wrap">
      <div className="head"><Label n="01">The range</Label><Split text="Eleven kinds of board, each priced by size." accent={['priced']} /></div>
      <div className="rng">
        <div className="rng__sticky">
          <div className="rng__panel" style={{ backgroundColor: `var(${panelBg})`, '--pk': panelBg === '--deep' ? '#ffffff' : 'var(--deep)' }}>
            <AnimatePresence mode="wait">
              <motion.span key={'g' + a} className="rng__ghost" aria-hidden="true" initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -80 }} transition={{ duration: .6, ease }}>
                <motion.b style={still ? undefined : { y: ghostY }}>{String(a + 1).padStart(2, '0')}</motion.b>
              </motion.span>
            </AnimatePresence>
            <span className="rng__count">{String(a + 1).padStart(2, '0')} <i>/ {String(showcase.length).padStart(2, '0')}</i></span>
            <div className="rng__stage">
              <AnimatePresence mode="wait">
                <motion.div key={cur.id} className="rng__art" initial={{ opacity: 0, rotateY: -75, x: 90, scale: .85 }} animate={{ opacity: 1, rotateY: 0, x: 0, scale: 1 }} exit={{ opacity: 0, rotateY: 75, x: -90, scale: .85 }} transition={{ duration: .7, ease }}>
                  <motion.div className="rng__float" style={still ? undefined : { rotateY: turn, rotateX: lift, x: drift }}>
                    <ProductImage product={p} />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
              <motion.i className="rng__shadow" style={still ? undefined : { scaleX: shadowScale }} />
            </div>
            <nav className="rng__dots" aria-label="Jump to a board">
              {showcase.map((s, i) => <button key={s.id} type="button" className={i === a ? 'is-on' : ''} aria-label={byId[s.id].name} aria-current={i === a} onClick={() => goTo(s.id)} />)}
            </nav>
            <div className="rng__foot">
              <span className="rng__price">{from ? <>From {formatPrice(from)}</> : 'Price on request'}</span>
              {p.options && <span className="rng__price rng__price--alt">{p.options.length} sizes</span>}
            </div>
          </div>
        </div>
        <ol className="rng__list" ref={listRef}>
          {showcase.map((s, i) => <RngItem key={s.id} s={s} i={i} a={a} setA={setA} still={still} />)}
        </ol>
      </div>
      <p className="more"><a className="btn btn--ghost" href="/ecommerce/">See all {products.length} boards in the shop <Arrow /></a></p>
    </div>
  </section>;
}

/* ───────── process: pinned, scrolls sideways; cards float, turn in 3D and tilt toward the cursor ───────── */
const steps = [
  ['Tell us about the space', 'Share the wall, the room and how it is used. We recommend the board type and the size.', 'workshop', 'process-1', 'A board being cut to size in the workshop'],
  ['Get a clear quote', 'We reply with a price and a delivery date, so you know the cost before anything is made.', 'quote', 'process-quote', 'A written quote for a classroom board'],
  ['We make it to size', 'Your board is made in Nagpur to the size of your wall, in the surface and finish you chose.', 'workshop', 'process-make', 'A board being cut to size in the workshop'],
  ['We fit it on site', 'Supply and installation come from one team, so the board arrives and goes up without you chasing two suppliers.', 'install', 'install-mounting', 'An installer levelling a board on a classroom wall'],
  ['We check it is level', 'Before we leave, the board is checked for level and secure fixing, so it is ready for the first lesson.', 'check', 'process-check', 'A finished board on a classroom wall, checked level'],
  ['We stay on call', 'A familiar team to phone for repairs and questions long after the board is on the wall.', 'room', 'room-1', 'A classroom with a greenboard and rows of desks'],
];

function PCard({ step, i, x, flat }) {
  const [t, d, scene, name, alt] = step;
  const ref = useRef(null);
  const ry = useMotionValue(0); const sc = useMotionValue(1);
  const hx = useMotionValue(0); const hy = useMotionValue(0);
  const sry = useSpring(ry, soft); const ssc = useSpring(sc, soft);
  const shx = useSpring(hx, { stiffness: 140, damping: 18 }); const shy = useSpring(hy, { stiffness: 140, damping: 18 });
  const rotateY = useTransform([sry, shx], ([a, b]) => a + b);
  const update = () => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const n = Math.max(-1.4, Math.min(1.4, ((r.left + r.width / 2) - window.innerWidth / 2) / (window.innerWidth / 2)));
    ry.set(-n * 22); sc.set(1 - Math.min(Math.abs(n), 1) * .1);
  };
  useMotionValueEvent(x, 'change', update);
  useEffect(() => { update(); window.addEventListener('resize', update); return () => window.removeEventListener('resize', update); }, []);
  const move = e => { const r = e.currentTarget.getBoundingClientRect(); hx.set(((e.clientX - r.left) / r.width - .5) * 14); hy.set(-((e.clientY - r.top) / r.height - .5) * 10); };
  const leave = () => { hx.set(0); hy.set(0); };
  return <motion.li ref={ref} className="pcard" onPointerMove={flat ? undefined : move} onPointerLeave={flat ? undefined : leave}
    style={flat ? undefined : { rotateY, rotateX: shy, scale: ssc, transformPerspective: 1200 }}>
    <div className="pcard__float" style={{ '--fd': `${i * -2.1}s` }}>
      <span className="pcard__n">0{i + 1}</span>
      <h3>{t}</h3><p>{d}</p>
      <Slot name={name} scene={scene} ratio="auto" alt={alt} />
    </div>
  </motion.li>;
}

export function Process() {
  const ref = useRef(null); const track = useRef(null); const [dist, setDist] = useState(0); const still = useStill();
  const flat = still || (typeof window !== 'undefined' && window.matchMedia('(max-width:1100px)').matches);
  useEffect(() => {
    const f = () => setDist(Math.max(0, track.current.scrollWidth - window.innerWidth));
    f(); window.addEventListener('resize', f); const t = setTimeout(f, 600);
    return () => { window.removeEventListener('resize', f); clearTimeout(t); };
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const sp = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: .5 });
  const x = useTransform(sp, [0, 1], [0, -dist]);
  const bar = useTransform(sp, [0, 1], ['0%', '100%']);
  return <section className="process" id="install" ref={ref} style={{ '--dist': `${dist}px` }}>
    <div className="process__stick">
      <div className="wrap process__head"><Label n="02">How it works</Label><Split text="From first call to a board on the wall." accent={['wall.']} /></div>
      <div className="process__viewport">
        <motion.ol className="process__track" ref={track} style={{ x }}>
          {steps.map((s, i) => <PCard key={s[0]} step={s} i={i} x={x} flat={flat} />)}
        </motion.ol>
      </div>
      <div className="wrap"><div className="process__bar" aria-hidden="true"><motion.i style={{ width: bar }} /></div></div>
    </div>
  </section>;
}

/* ───────── expanding picture band ───────── */
export function Rooms() {
  const ref = useRef(null); const still = useStill();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const clip = useTransform(p, [.04, .72], ['inset(52% 12% 8% 12% round 28px)', 'inset(0% 0% 0% 0% round 0px)']);
  const scale = useTransform(p, [.04, .72], [1.3, 1]);
  const head = useTransform(p, [0, .32], [1, 0]); const headY = useTransform(p, [0, .32], [0, -50]);
  const stats = useTransform(p, [.62, .85], [0, 1]); const statsY = useTransform(p, [.62, .85], [30, 0]);
  const years = new Date().getFullYear() - 2001;
  return <section className="expand" id="rooms" ref={ref}>
    <div className="expand__stick">
      <motion.div className="wrap expand__head" style={still ? undefined : { opacity: head, y: headY }}>
        <span className="label label--light"><b>03</b>Supply and set-up</span>
        <h2>From one board to a full classroom.</h2>
        <p className="lead">Writing boards, notice boards, furniture and laboratory set-ups, supplied and fitted together.</p>
      </motion.div>
      <motion.div className="expand__frame" style={still ? undefined : { clipPath: clip }}>
        <motion.div className="expand__in" style={still ? undefined : { scale }}><Slot name="room-1" scene="room" ratio="auto" alt="A classroom with a greenboard and rows of desks" /></motion.div>
        <motion.div className="expand__stats" style={still ? undefined : { opacity: stats, y: statsY }}>
          <div><b><Count to={years} />+</b><span>years making boards</span></div>
          <div><b><Count to={11} /></b><span>board types</span></div>
          <div><b>1</b><span>team from supply to service</span></div>
        </motion.div>
      </motion.div>
    </div>
  </section>;
}

/* ───────── price estimator ───────── */
const priced = ['whiteboard', 'greenboard', 'combination', 'acrylic-cover', 'magnetic', 'ceramic', 'drawing', 'digital'];
export function PriceIt({ onQuote }) {
  const [id, setId] = useState('whiteboard'); const [si, setSi] = useState(3); const [qty, setQty] = useState(1);
  const p = byId[id]; const opts = p.options; const size = opts[Math.min(si, opts.length - 1)];
  const total = size.price * qty;
  const [shown, setShown] = useState(total); const prev = useRef(total); const still = useStill();
  useEffect(() => {
    if (still) { setShown(total); return; }
    const c = animate(prev.current, total, { duration: .6, ease, onUpdate: setShown, onComplete: () => { prev.current = total; } });
    return () => { prev.current = total; c.stop(); };
  }, [total, still]);
  const pick = k => { setId(k); setSi(Math.min(si, byId[k].options.length - 1)); };
  return <section className="section section--paper" id="price">
    <div className="wrap">
      <div className="head"><Label n="04">Pricing</Label><Split text="Choose a board and see the price." accent={['price.']} /></div>
      <Reveal className="calc">
        <div className="calc__controls">
          <fieldset><legend>Board</legend><div className="chips">{priced.map(k => <button key={k} type="button" className={'chipbtn' + (id === k ? ' is-on' : '')} aria-pressed={id === k} onClick={() => pick(k)}>{byId[k].name}</button>)}</div></fieldset>
          <fieldset><legend>Size</legend><div className="chips">{opts.map((o, i) => <button key={o.label} type="button" className={'chipbtn' + (i === si ? ' is-on' : '')} aria-pressed={i === si} onClick={() => setSi(i)}>{o.label}</button>)}</div></fieldset>
          <fieldset><legend>Quantity</legend><div className="qty"><button type="button" aria-label="Fewer" onClick={() => setQty(Math.max(1, qty - 1))}>−</button><output aria-live="polite">{qty}</output><button type="button" aria-label="More" onClick={() => setQty(Math.min(99, qty + 1))}>+</button></div></fieldset>
        </div>
        <div className="calc__result">
          <span className="calc__label">Estimated price</span>
          <b className="calc__total">{formatPrice(shown)}</b>
          <p>{qty} × {p.name}, {size.label}, at {formatPrice(size.price)} each. The final quote is confirmed after we hear your needs.</p>
          <button className="btn btn--light" type="button" onClick={() => onQuote(`${qty} × ${p.name}, ${size.label}. Estimated ${formatPrice(total)}.`, p)}>Request a quote for this <Arrow /></button>
        </div>
      </Reveal>
      <details className="alltable"><summary>See every size and price</summary>
        <div className="tables">
          <table><caption>Whiteboard and greenboard</caption><thead><tr><th scope="col">Size</th><th scope="col">Price</th></tr></thead>
            <tbody>{byId.whiteboard.options.map(o => <tr key={o.label}><th scope="row">{o.label}</th><td>{formatPrice(o.price)}</td></tr>)}</tbody></table>
          <table><caption>Other boards, from</caption><thead><tr><th scope="col">Board</th><th scope="col">From</th></tr></thead>
            <tbody>{products.filter(x => !['whiteboard', 'greenboard'].includes(x.id)).map(x => <tr key={x.id}><th scope="row">{x.name}</th><td>{x.options ? formatPrice(startingPrice(x)) : 'On request'}</td></tr>)}</tbody></table>
        </div>
      </details>
    </div>
  </section>;
}

/* ───────── about ───────── */
function Word({ word, i, n, progress, strong }) {
  const start = i / n * .9; const end = start + .9 / n;
  const opacity = useTransform(progress, [start, end], [.2, 1]);
  return <motion.span style={{ opacity }} className={strong ? 'strong' : ''}>{word} </motion.span>;
}
function Statement({ text, strong = [] }) {
  const ref = useRef(null); const still = useStill();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] });
  const words = text.split(' ');
  if (still) return <p className="statement" ref={ref}>{text}</p>;
  return <p className="statement" ref={ref}>{words.map((w, i) => <Word key={i} word={w} i={i} n={words.length} progress={scrollYProgress} strong={strong.includes(w.replace(/[.,]/g, ''))} />)}</p>;
}
const clients = [['Adani Group', 'Industrial'], ['Datta Meghe Group', 'Education and healthcare'], ['Anjuman', 'Education'], ['Sanskar Vidya', 'School, Nagpur'], ['Govt. Polytechnic', 'Government']];
export function About() {
  return <section className="section" id="about">
    <div className="wrap">
      <Label n="05">About</Label>
      <Statement text="Paradise Enterprise has made boards and school furniture in Nagpur since 2001, and the same family still runs it." strong={['2001', 'Nagpur']} />
      <div className="about">
        <div>
          <h3 className="sub">Leadership</h3>
          <Reveal className="person"><span className="person__n">01</span><div><h4>Pramod M. Dahikar</h4><span className="role">Founder, 2001</span><p>Started the company and still sets the standard for how every board is made.</p></div></Reveal>
          <Reveal className="person" delay={.08}><span className="person__n">02</span><div><h4>Deep P. Dahikar</h4><span className="role">Joined 2021</span><p>Leads operations and growth while keeping to the standards the business was built on.</p></div></Reveal>
        </div>
        <div>
          <h3 className="sub">Supplied to</h3>
          <ul className="clients">{clients.map(([n, t]) => <li key={n}><span>{n}</span><i>{t}</i><Arrow /></li>)}</ul>
        </div>
      </div>
    </div>
  </section>;
}

/* ───────── faq ───────── */
const faqs = [
  ['How do I get a price?', 'Use the pricing tool above for most boards, or add boards in the shop and send the quote request. For anything else, use the form below.'],
  ['Do you fit the boards?', 'Yes. Supply and installation come from the same team, and we are on call for service afterwards.'],
  ['Can you make a size that is not listed?', 'Tell us the wall size in the quote form and we will confirm the board and the price.'],
  ['What else do you supply besides boards?', 'School furniture, digital panels, stands, podiums, first aid and suggestion boxes, fire systems and laboratory set-ups.'],
  ['Where are you based?', 'We work from Nagpur, Maharashtra, and supply institutions across the region.'],
];
export function Faq() {
  return <section className="section section--paper" id="faq">
    <div className="wrap faq">
      <div><Label n="06">FAQ</Label><Split text="Questions we hear often." accent={['often.']} /></div>
      <Reveal delay={.1}>{faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</Reveal>
    </div>
  </section>;
}

/* ───────── quote ───────── */
const categories = ['Writing Boards', 'Notice Boards', 'School Furniture', 'First Aid / Suggestion / Complaint Boxes', 'Stands (Tripod / Four Leg)', 'Digital Panels', 'Fire Systems', 'Chemistry / Biology Lab Setup', 'Mic / Podium', 'Accessories', 'General Inquiry'];
export function Quote({ prefill }) {
  const [status, setStatus] = useState(''); const [category, setCategory] = useState(''); const [message, setMessage] = useState('');
  useEffect(() => { if (!prefill) return; setMessage(prefill.text); setCategory(prefill.category); }, [prefill]);
  function submit(e) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const body = `Name: ${d.get('name')}\nPhone: ${d.get('phone')}\nEmail: ${d.get('email')}\nInterest: ${category}\n\n${message}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Website enquiry: ' + category)}&body=${encodeURIComponent(body)}`;
    setStatus('Your email app should open with the enquiry ready to send. If it does not, call or write to us using the details alongside.');
  }
  return <section className="section" id="contact">
    <div className="wrap cols">
      <div>
        <Label n="07">Contact</Label>
        <Split text="Request a quote." accent={['quote.']} />
        <p className="lead">Tell us what you need and the size of the space. We reply with a price and a delivery date.</p>
        <dl className="contact">
          <div><dt>Phone</dt><dd><a href="tel:+919922404078">{PHONE_1}</a><br /><a href="tel:+919822571372">{PHONE_2}</a></dd></div>
          <div><dt>Email</dt><dd><a href={`mailto:${EMAIL}`}>{EMAIL}</a></dd></div>
          <div><dt>Visit</dt><dd>Dahikar Premises, Nagpur<br /><a className="link link--draw" href={MAPS} target="_blank" rel="noopener noreferrer">Get directions <Arrow /></a></dd></div>
        </dl>
      </div>
      <Reveal delay={.1}>
        <form className="form" onSubmit={submit}>
          <div className="form__row">
            <label>Your name<input name="name" autoComplete="name" required maxLength={100} /></label>
            <label>Phone<input name="phone" type="tel" autoComplete="tel" required pattern="[+0-9() .\-]{7,20}" title="7 to 20 digits" /></label>
          </div>
          <label>Email<input name="email" type="email" autoComplete="email" required maxLength={200} /></label>
          <label>What do you need<select value={category} onChange={e => setCategory(e.target.value)} required><option value="" disabled>Choose one</option>{categories.map(c => <option key={c}>{c}</option>)}</select></label>
          <label>Message<textarea rows="4" required maxLength={3000} value={message} onChange={e => setMessage(e.target.value)} placeholder="Size of the wall, number of rooms, where it is going" /></label>
          <button className="btn btn--primary" type="submit">Request a quote <Arrow /></button>
          <p className="form__note" role="status">{status || 'This opens your email app with the enquiry ready to send.'}</p>
        </form>
      </Reveal>
    </div>
  </section>;
}

/* ───────── footer ───────── */
export function Footer() {
  return <footer className="footer">
    <div className="wrap footer__grid">
      <div><a className="logo logo--w" href="#top"><LogoMark tone="paper" /><span className="logo__text"><b>Paradise<em> Enterprise</em></b><small>Est. 2001 · Nagpur</small></span></a><p>Boards and school furniture, made and fitted in Nagpur since 2001.</p></div>
      <nav aria-label="Footer"><h4>Site</h4>{nav.map(([id, label]) => <a key={id} className="link" href={`#${id}`}>{label}</a>)}<a className="link" href="/ecommerce/">Shop</a></nav>
      <div><h4>Contact</h4><a className="link" href="tel:+919922404078">{PHONE_1}</a><a className="link" href="tel:+919822571372">{PHONE_2}</a><a className="link" href={`mailto:${EMAIL}`}>{EMAIL}</a><a className="link" href={INSTAGRAM} target="_blank" rel="noopener noreferrer">Instagram</a></div>
    </div>
    <div className="footer__word" aria-hidden="true">Paradise</div>
    <div className="wrap footer__base"><span>© {new Date().getFullYear()} Paradise Enterprise · Nagpur, Maharashtra</span></div>
  </footer>;
}
