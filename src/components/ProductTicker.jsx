import { motion } from 'framer-motion';
import { useSiteReducedMotion } from './MotionPreferences';

const items = ['Writing Boards', 'Notice Boards', 'School Furniture', 'Digital Panels', 'Fire Systems', 'Lab Setup', 'Mic & Podium', 'Accessories', 'After-Sale Service', 'Premium Quality'];

export default function ProductTicker() {
  const reduced = useSiteReducedMotion();
  return <div className="marquee-ticker" aria-label="Our product range">
    <motion.div className="marquee-track" id="marqueeTrack"
      animate={reduced ? { x: 0 } : { x: ['0%', '-50%'] }}
      transition={reduced ? { duration: 0 } : { x: { duration: 25, repeat: Infinity, ease: 'linear' } }}>
      {[0, 1].map(copy => <div className="marquee-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
        {items.map(item => <div className="marquee-item" key={item}><span className="marquee-dot" aria-hidden="true" />{item}</div>)}
      </div>)}
    </motion.div>
  </div>;
}
