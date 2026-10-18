import { useSiteReducedMotion } from './MotionPreferences';
import { motion } from 'framer-motion';
import { BoardScene } from './BoardMoment';

export default function ProjectCTA() {
  const reduced = useSiteReducedMotion();
  return <section className="project-cta" aria-labelledby="project-title"><div className="project-cta-inner reveal">
    <div className="cta-board-copy"><div className="section-label"><span /><p>Your next project</p></div><h2 id="project-title">Better spaces. <em>Made possible.</em></h2><p>One classroom or an entire institution. Let’s bring your vision to life.</p>
    <motion.a href="#contact" className="btn-primary" whileHover={reduced ? {} : { y: -4 }} whileTap={{ scale: .98 }}><span>Discuss your project ↗</span></motion.a>
    </div><div className="cta-live-board"><BoardScene line="Your next big idea." scene={1} /><span>A fresh board. A world of possibilities.</span></div>
  </div></section>;
}

