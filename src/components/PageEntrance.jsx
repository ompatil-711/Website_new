import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSiteReducedMotion } from './MotionPreferences';

const ease = [.22, 1, .36, 1];

export default function PageEntrance() {
  const reduced = useSiteReducedMotion();
  const [visible, setVisible] = useState(!reduced);
  useEffect(() => {
    if (reduced) { setVisible(false); return; }
    const timeout = setTimeout(() => setVisible(false), 1200);
    return () => clearTimeout(timeout);
  }, [reduced]);
  return <AnimatePresence>{visible && <motion.div className="page-entrance entrance-v2" aria-hidden="true"
    initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
    exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
    transition={{ duration: .65, ease: [.76, 0, .24, 1] }}>
    <div className="entrance-aura entrance-aura-blue" /><div className="entrance-aura entrance-aura-peach" />
    <div className="entrance-frame"><span>PARADISE ENTERPRISE</span><span>EST. 2001 <i /> NAGPUR, INDIA</span></div>
    <motion.div className="entrance-composition" exit={{ opacity: 0, y: -25, transition: { duration: .3 } }}>
      <div className="entrance-emblem-stage">
        <motion.div className="entrance-orbit" initial={{ rotate: -65, opacity: 0 }} animate={{ rotate: 60, opacity: 1 }} transition={{ duration: 1.5, ease }}>
          <svg viewBox="0 0 200 200" fill="none"><motion.circle cx="100" cy="100" r="88" stroke="#dce4ff" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, ease }}/><circle cx="100" cy="12" r="5" fill="#ff6a3d"/><circle cx="100" cy="188" r="3" fill="#13c6c0"/></svg>
        </motion.div>
        <motion.div className="entrance-logo-back" initial={{ rotate: -20, scale: .5, opacity: 0 }} animate={{ rotate: 10, scale: 1, opacity: 1 }} transition={{ duration: .7, ease }} />
        <motion.div className="entrance-logo-front" initial={{ rotate: -15, scale: .7, opacity: 0 }} animate={{ rotate: 0, scale: 1, opacity: 1 }} transition={{ duration: .75, ease }}>
          <svg viewBox="0 0 120 120" fill="none"><motion.path d="M43 89V31H65C91 31 91 64 65 64H44" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: .65, delay: .16, ease }} /></svg>
        </motion.div>
        <motion.span className="entrance-spark" initial={{ scale: 0, rotate: -60 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: .4, type: 'spring', stiffness: 180, damping: 14 }}>✦</motion.span>
      </div>
      <h2 className="entrance-wordmark">{['Paradise', 'Enterprise'].map((word, index) => <span className="entrance-word-clip" key={word}><motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: .18 + index * .1, duration: .65, ease }}>{word}</motion.span></span>)}</h2>
      <motion.p className="entrance-tagline" initial={{ opacity: 0, y: 9 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .4, duration: .5 }}>GREAT SPACES. GREATER POSSIBILITIES.</motion.p>
      <div className="entrance-segments">{[0, 1, 2, 3].map(index => <span key={index}><motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: .15 + index * .2, duration: .35, ease }} /></span>)}</div>
      <motion.div className="entrance-categories" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5, duration: .4 }}><span>Boards</span><i /><span>Furniture</span><i /><span>Digital solutions</span></motion.div>
    </motion.div>
    <div className="entrance-bottom"><span>BUILT ON TRUST. DESIGNED FOR WHAT’S NEXT.</span><div className="entrance-activity">{[0, 1, 2].map(index => <motion.i key={index} animate={{ opacity: [.25, 1, .25], y: [0, -3, 0] }} transition={{ duration: .75, repeat: Infinity, delay: index * .12 }} />)}</div></div>
  </motion.div>}</AnimatePresence>;
}
