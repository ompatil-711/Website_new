import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSiteReducedMotion } from './MotionPreferences';
import AnimatedBoard from './AnimatedBoard';

export default function BoardEntrance() {
  const reduced = useSiteReducedMotion();
  const [visible, setVisible] = useState(!reduced);
  useEffect(() => {
    if (reduced) { setVisible(false); return; }
    const timeout = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(timeout);
  }, [reduced]);
  return <AnimatePresence>{visible && <motion.div className="page-entrance board-entrance" initial={{ opacity: 1 }} exit={{ opacity: 0, y: -24 }} transition={{ duration: .45 }}>
    <div className="entrance-frame"><span>PARADISE ENTERPRISE</span><span>EST. 2001 <i /> NAGPUR, INDIA</span></div>
    <div className="loader-board-pair" aria-hidden="true">
      <motion.div className="loader-green-board" initial={{ opacity: 0, rotate: -12, x: -30 }} animate={{ opacity: 1, rotate: -8, x: 0 }} transition={{ duration: .6 }}><AnimatedBoard green /></motion.div>
      <motion.div className="loader-white-board" initial={{ opacity: 0, rotate: 10, y: 24 }} animate={{ opacity: 1, rotate: 4, y: 0 }} transition={{ duration: .6 }}><AnimatedBoard /></motion.div>
    </div>
    <div className="board-loader-copy" role="status"><span>A CLEAN BOARD. A FRESH START.</span><h2>Make room for <em>ideas.</em></h2><p>Whiteboards & greenboards by Paradise Enterprise</p></div>
    <div className="board-loader-track" aria-hidden="true"><motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 2.1, ease: 'easeInOut' }} /></div>
    <button type="button" className="board-loader-skip" onClick={() => setVisible(false)}>Skip intro →</button>
    <div className="entrance-bottom" aria-hidden="true"><span>WRITE. ERASE. IMAGINE AGAIN.</span><span>WHITEBOARDS / GREENBOARDS</span></div>
  </motion.div>}</AnimatePresence>;
}
