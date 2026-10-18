import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSiteReducedMotion } from './MotionPreferences';

const scenes = [
  { label: 'Teach', title: 'A little spark. A big discovery.', line: 'Learn something new.', note: 'For lessons, questions and lightbulb moments.', green: true },
  { label: 'Plan', title: 'Give your next idea a place to grow.', line: 'Make a little progress.', note: 'For team huddles, clear plans and fresh thinking.', green: false },
  { label: 'Create', title: 'Every possibility starts with a mark.', line: 'Imagine. Try. Repeat.', note: 'For sketches, possibilities and happy accidents.', green: true },
];

export function BoardScene({ green = false, line = 'Your next big idea.', scene = 0 }) {
  const uid = useId().replaceAll(':', '');
  const reduced = useSiteReducedMotion();
  const ink = green ? '#fffce8' : '#3454ed';
  const draw = { hidden: { pathLength: 0, opacity: 0 }, shown: { pathLength: 1, opacity: 1 } };
  return <motion.svg className="board-scene" viewBox="0 0 460 250" aria-hidden="true" initial={reduced ? false : 'hidden'} whileInView="shown" viewport={{ once: true, amount: .55 }}>
    <defs><clipPath id={`writing-${uid}`}><motion.rect x="44" y="35" height="65" variants={{ hidden: { width: 0 }, shown: { width: 380 } }} transition={{ duration: 1.2, delay: .2, ease: 'linear' }} /></clipPath></defs>
    <rect x="9" y="10" width="442" height="217" rx="8" fill="#cfdae2" stroke="#91a3b7" strokeWidth="2" />
    <rect x="17" y="18" width="426" height="200" rx="3" fill={green ? '#145747' : '#fff'} />
    <path d="M19 20h422" stroke={green ? '#ffffff18' : '#e8eef7'} strokeWidth="3" />
    <text x="44" y="78" fill={ink} fontSize="29" fontFamily="'Segoe Print', 'Comic Sans MS', cursive" fontStyle="italic" clipPath={`url(#writing-${uid})`}>{line}</text>
    <g fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <motion.path d="M44 94q150 10 291-1" variants={draw} transition={{ duration: .6, delay: 1.3 }} />
      <motion.path d={scene === 1 ? 'M58 183l64-31 68 16 76-45m-17 0h17v18 M57 124v67h223' : scene === 2 ? 'M66 178l18-48 50 13 2 47z M155 155q-10-30 19-31t30 30-28 31-21-30 M229 178l25-50 25 51z' : 'M60 144l9 9 17-23 M104 143h110 M60 178l9 9 17-23 M104 177h79 M254 139q-17-21 5-29t29 18q0 12-13 21v11h-15v-11z M260 170h15'} variants={draw} transition={{ duration: .9, delay: 1.7 }} />
      <motion.path d="m340 151 12 12 26-31 M335 186q22 7 48-3" stroke={green ? '#74e4c5' : '#ff6a3d'} variants={draw} transition={{ duration: .45, delay: 2.4 }} />
    </g>
    <motion.g variants={{ hidden: { x: 44, y: 78, opacity: 0 }, shown: { x: [44, 210, 381], y: [78, 72, 78], opacity: [0, 1, 0] } }} transition={{ duration: 1.4, delay: .2, ease: 'linear' }}>
      <g transform="rotate(32)"><path d="M0 0l-3-8h6z" fill={ink} /><rect x="-4" y="-43" width="8" height="35" rx="2" fill={green ? '#fffce8' : '#ff6a3d'} /></g>
    </motion.g>
    <path d="M6 227h448" stroke="#91a3b7" strokeWidth="5" strokeLinecap="round" />
    <rect x="347" y="216" width="49" height="9" rx="2" fill="#ff6a3d" /><path d="M352 219h38" stroke="#243452" strokeWidth="3" />
    <path d="M45 222h35" stroke={ink} strokeWidth="4" strokeLinecap="round" />
  </motion.svg>;
}

export default function BoardMoment() {
  const [selected, setSelected] = useState(0);
  const [replay, setReplay] = useState(0);
  const current = scenes[selected];
  return <section className="board-moment" aria-labelledby="board-moment-title">
    <div className="board-moment-inner">
      <div className="board-moment-copy">
        <div className="section-label"><span /><p>More than a writing surface</p></div>
        <h2 className="section-title" id="board-moment-title">Write it.<br /> <em>Bring it to life.</em></h2>
        <p>From the classroom to the meeting room, great things begin on a board.</p>
        <div className="board-scene-tabs" role="group" aria-label="Choose a board inspiration">{scenes.map((item, index) => <motion.button type="button" key={item.label} aria-pressed={selected === index} onClick={() => setSelected(index)} whileHover={{ y: -3 }} whileTap={{ scale: .97 }}><span>0{index + 1}</span>{item.label}<b aria-hidden="true">↗</b></motion.button>)}</div>
        <a className="board-moment-link" href="#contact">Find a board for your space <span aria-hidden="true">→</span></a>
      </div>
      <div className="board-moment-demo">
        <div className="board-demo-top"><span>THE EVERYDAY POSSIBILITIES</span><span>{current.green ? 'CHALK + GREENBOARD' : 'MARKER + WHITEBOARD'}</span></div>
        <AnimatePresence mode="wait"><motion.div key={`${selected}-${replay}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 12 }} transition={{ duration: .2 }}><BoardScene green={current.green} line={current.line} scene={selected} /></motion.div></AnimatePresence>
        <div className="board-demo-bottom"><div aria-live="polite"><h3>{current.title}</h3><p>{current.note}</p></div><button type="button" onClick={() => setReplay(value => value + 1)} aria-label="Replay board writing animation">↻ <span>Replay</span></button></div>
      </div>
    </div>
  </section>;
}
