import { useSiteReducedMotion } from './MotionPreferences';
import { motion } from 'framer-motion';

export default function MotionCard({ children, className = '', index = 0, ...props }) {
  const reduced = useSiteReducedMotion();

  const visible = { opacity: 1, y: 0, scale: 1, rotateX: 0 };
  return <motion.div {...props} className={`${className} motion-card`}
    initial={reduced ? false : 'hidden'}

    whileInView="visible"
    variants={{ hidden: { opacity: 0, y: 32, scale: .97, rotateX: 3 }, visible }}
    transition={{ duration: .72, delay: reduced ? 0 : (index % 3) * .1, ease: [.16, 1, .3, 1] }}
    whileHover={reduced ? undefined : { y: -5, scale: 1.012, transition: { duration: .3, delay: 0 } }}
    onFocusCapture={event => { event.currentTarget.style.opacity = '1'; }}
    viewport={{ once: false, amount: .14 }}
    style={{ transformPerspective: 1000 }}>
    {children}
  </motion.div>;
}

