import { motion } from 'framer-motion';
import { useSiteReducedMotion } from './MotionPreferences';

const lettering = 'M103 70l-5 36m7-50 1-2 M135 57l-11 47q-15 9-15-4t18-15 M137 97q29-8 17-14t-18 14q-2 18 21 4 M181 86q-19-9-21 12t20-9l-4 16 10-4 M211 85q-22-9-18 4t10 12q-8 12-20 3';

export default function AnimatedBoard({ green = false, run = 0, children }) {
  const reduced = useSiteReducedMotion();
  const ink = green ? '#fffce5' : '#3454ed';
  return <svg className={`animated-board ${green ? 'is-green' : ''}`} viewBox="0 0 360 210" aria-hidden="true">
    <ellipse cx="180" cy="193" rx="139" ry="8" fill="#14244c12" />
    <rect x="15" y="15" width="330" height="167" rx="7" fill="#c3cfda" stroke="#91a3b7" strokeWidth="2" />
    <rect x="22" y="22" width="316" height="152" rx="2" fill={green ? '#145747' : '#fff'} />
    <path d="M24 24h312v3H24" fill={green ? '#ffffff12' : '#eaf0fa'} />
    <g key={`${green}-${run}`} fill="none" stroke={ink} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <motion.path d={lettering} initial={reduced ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.05, delay: .12, ease: 'linear' }} />
      <motion.path d="M98 121q59 8 119-3m-3-46 8-10m7 23 12-3 M250 110l9 9 18-25" initial={reduced ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: .4, delay: 1.15 }} />
    </g>
    {!reduced && <motion.g key={`pen-${green}-${run}`} initial={{ x: 103, y: 70, opacity: 0 }} animate={{ x: [103, 98, 135, 124, 154, 160, 181, 193, 211, 217], y: [70, 106, 57, 104, 83, 105, 86, 89, 104, 118], opacity: [0, 1, 1, 1, 1, 1, 1, 1, 1, 0] }} transition={{ duration: 1.55, ease: 'linear' }}>
      <g transform="rotate(32)"><path d="M0 0l-3-9h6z" fill={green ? '#fff' : '#243452'} /><rect x="-4" y="-48" width="8" height="39" rx="2" fill={green ? '#fffce5' : '#ff6a3d'} /><path d="M-4-40h8" stroke={green ? '#e5d8ad' : '#fff'} strokeWidth="3" /></g>
    </motion.g>}
    {children}
    <path d="M12 181h336" stroke="#8b9eb3" strokeWidth="5" strokeLinecap="round" />
    <rect x="257" y="171" width="43" height="9" rx="2" fill="#ff6a3d" /><path d="M261 174h35" stroke="#243452" strokeWidth="3" />
    <rect x="51" y="175" width="42" height="4" rx="2" fill={green ? '#fffce5' : '#3454ed'} />
  </svg>;
}
