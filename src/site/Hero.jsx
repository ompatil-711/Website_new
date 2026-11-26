import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Arrow, Count, DotField, Split, ease, useStill, cssVar } from './motion';
import { groups, products } from '../../ecommerce/src/products';

const inks = [['--accent', 'Blue marker'], ['--cool', 'Green marker']];

/* a board you can actually write on */
function DrawBoard() {
  const canvas = useRef(null); const colorRef = useRef(inks[0][0]);
  const [color, setColor] = useState(inks[0][0]); const [touched, setTouched] = useState(false);
  const [coarse] = useState(() => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches);
  const [drawOn, setDrawOn] = useState(false);
  const drawing = useRef(false); const last = useRef(null);
  useEffect(() => {
    const c = canvas.current;
    const fit = () => { const r = c.getBoundingClientRect(); const d = window.devicePixelRatio || 1; c.width = r.width * d; c.height = r.height * d; const x = c.getContext('2d'); x.scale(d, d); x.lineCap = 'round'; x.lineJoin = 'round'; };
    fit(); const ro = new ResizeObserver(fit); ro.observe(c); return () => ro.disconnect();
  }, []);
  const pos = e => { const r = canvas.current.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  const line = (a, b) => { const x = canvas.current.getContext('2d'); x.strokeStyle = cssVar(colorRef.current); x.lineWidth = 5; x.beginPath(); x.moveTo(a[0], a[1]); x.lineTo(b[0], b[1]); x.stroke(); };
  const down = e => { if (coarse && !drawOn) return; e.stopPropagation(); e.currentTarget.setPointerCapture(e.pointerId); drawing.current = true; last.current = pos(e); line(last.current, [last.current[0] + .1, last.current[1]]); setTouched(true); };
  const move = e => { if (!drawing.current) return; const p = pos(e); line(last.current, p); last.current = p; };
  const up = () => { drawing.current = false; };
  const clear = () => { const c = canvas.current; c.getContext('2d').clearRect(0, 0, c.width, c.height); };
  return <div className="dboard">
    <div className="dboard__face">
      <svg className={'dboard__demo' + (touched ? ' is-off' : '')} viewBox="0 0 400 240" aria-hidden="true">
        <path className="draw" pathLength="1" d="M40 170 L110 110 L170 140 L250 70 L350 50" fill="none" stroke="var(--accent)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" style={{ '--t': '4.5s' }} />
        <path className="draw" pathLength="1" d="M40 60 q30 -34 60 0 t60 0" fill="none" stroke="var(--cool)" strokeWidth="6" strokeLinecap="round" style={{ '--t': '4.5s', '--d': '.8s' }} />
        <circle className="draw" pathLength="1" cx="320" cy="170" r="26" fill="none" stroke="var(--cool)" strokeWidth="6" style={{ '--t': '4.5s', '--d': '1.4s' }} />
      </svg>
      <canvas ref={canvas} className="dboard__canvas" style={coarse ? { touchAction: drawOn ? 'none' : 'pan-y' } : undefined} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} aria-label="Drawing board: write or draw with your mouse or finger" />
      <span className={'dboard__hint' + (touched ? ' is-off' : '')}>{coarse ? 'Tap Draw, then write' : 'Try it. Write on the board'}</span>
    </div>
    <div className="dboard__tray">
      <span className="dboard__markers" role="group" aria-label="Marker colour">
        {inks.map(([c, n]) => <button key={c} type="button" className={'marker' + (color === c ? ' is-on' : '')} style={{ '--c': `var(${c})` }} aria-label={n} aria-pressed={color === c} onClick={() => { colorRef.current = c; setColor(c); }} />)}
      </span>
      {coarse && <button type="button" className="dboard__clear dboard__draw" aria-pressed={drawOn} onClick={() => setDrawOn(v => !v)}>{drawOn ? 'Done' : 'Draw'}</button>}
      <button type="button" className="dboard__clear" onClick={clear}>Wipe clean</button>
    </div>
  </div>;
}

/* a green classroom board, chalk writing itself */
function ChalkBoard() {
  return <div className="chalk" aria-hidden="true">
    <svg viewBox="0 0 400 270" preserveAspectRatio="xMidYMid slice">
      <path className="draw" pathLength="1" d="M40 70 h230" stroke="#fff" strokeWidth="6" strokeLinecap="round" fill="none" style={{ '--t': '5s' }} />
      <path className="draw" pathLength="1" d="M40 115 h170" stroke="#fff" strokeWidth="6" strokeLinecap="round" fill="none" style={{ '--t': '5s', '--d': '.5s' }} />
      <path className="draw" pathLength="1" d="M40 160 q35 -45 70 0 t70 0 t70 0" stroke="var(--sun)" strokeWidth="6" strokeLinecap="round" fill="none" style={{ '--t': '5s', '--d': '1s' }} />
      <path className="draw" pathLength="1" d="M300 200 l22 24 l52 -64" stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" style={{ '--t': '5s', '--d': '1.6s' }} />
    </svg>
    <i className="chalk__tray" />
  </div>;
}

/* a pin-up notice board with notes that sway */
function NoticeBoard() {
  return <div className="notice" aria-hidden="true">
    <i className="note-a"><b /><u /><u /></i><i className="note-b"><b /><u /><u /></i><i className="note-c"><b /><u /></i>
  </div>;
}

export default function Hero() {
  const ref = useRef(null); const still = useStill();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const wallY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 18 }); const sy = useSpring(my, { stiffness: 70, damping: 18 });
  const ax = useTransform(sx, [-1, 1], [-10, 10]); const ay = useTransform(sy, [-1, 1], [-8, 8]);
  const bx = useTransform(sx, [-1, 1], [22, -22]); const by = useTransform(sy, [-1, 1], [16, -16]);
  const cx = useTransform(sx, [-1, 1], [-30, 30]); const cy = useTransform(sy, [-1, 1], [-22, 22]);
  const rot = useTransform(sx, [-1, 1], [-1.5, 1.5]);
  const onMove = e => { if (still) return; const r = e.currentTarget.getBoundingClientRect(); mx.set(((e.clientX - r.left) / r.width - .5) * 2); my.set(((e.clientY - r.top) / r.height - .5) * 2); };
  const onLeave = () => { mx.set(0); my.set(0); };
  const years = new Date().getFullYear() - 2001;
  const up = i => still ? {} : { initial: { y: 30, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: .9, delay: .5 + i * .1, ease } };
  const pop = (d, from) => still ? {} : { initial: { opacity: 0, scale: .9, ...from }, animate: { opacity: 1, scale: 1, x: 0, y: 0 }, transition: { duration: 1.1, delay: d, ease } };
  return <section className="hero" id="top" ref={ref}>
    <DotField tone="light" />
    <div className="wrap hero__grid">
      <motion.div className="hero__copy" style={still ? undefined : { y: copyY }}>
        <motion.span className="label" {...up(0)}><i /> School and office supplies · Nagpur</motion.span>
        <Split as="h1" onLoad accent={['more']} delay={.15} text="Boards and much more for schools and offices." />
        <motion.p className="lead" {...up(1)}>Boards, stands, furniture, fire safety equipment and sound systems from one team in Nagpur.</motion.p>
        <motion.div className="btn-row" {...up(2)}>
          <a className="btn btn--light" href="#contact">Request a quote <Arrow /></a>
          <a className="btn btn--ghost" href="#products">See products</a>
        </motion.div>
      </motion.div>
      <motion.div className="wall" onPointerMove={onMove} onPointerLeave={onLeave} style={still ? undefined : { y: wallY }}>
        <motion.div className="wall__a" style={still ? undefined : { x: ax, y: ay, rotate: rot }} {...pop(.35, { x: 80 })}><DrawBoard /></motion.div>
        <motion.div className="wall__b" style={still ? undefined : { x: bx, y: by }} {...pop(.6, { y: 60 })}><ChalkBoard /></motion.div>
        <motion.div className="wall__c" style={still ? undefined : { x: cx, y: cy }} {...pop(.8, { y: 70 })}><NoticeBoard /></motion.div>
        <motion.span className="wchip wchip--a" style={still ? undefined : { x: bx }}>Fitted on site</motion.span>
        <motion.span className="wchip wchip--b" style={still ? undefined : { x: cx }}>{products.length} products</motion.span>
      </motion.div>
    </div>
    <motion.dl className="wrap specs" {...up(3)}>
      <div><dt>Established</dt><dd>2001</dd></div>
      <div><dt>Years in business</dt><dd><Count to={years} />+</dd></div>
      <div><dt>Product ranges</dt><dd><Count to={groups.length} /></dd></div>
      <div><dt>Supply and service</dt><dd>1 team</dd></div>
    </motion.dl>
  </section>;
}
