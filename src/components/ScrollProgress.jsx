import { useSiteReducedMotion } from './MotionPreferences';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const reduced = useSiteReducedMotion();
  return <motion.div className="scroll-progress" style={{ scaleX: reduced ? scrollYProgress : smooth }} aria-hidden="true" />;
}

