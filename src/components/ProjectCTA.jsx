import { useSiteReducedMotion } from './MotionPreferences';
import { motion } from 'framer-motion';

export default function ProjectCTA() {
  const reduced = useSiteReducedMotion();
  return <section className="project-cta" aria-labelledby="project-title"><div className="project-cta-inner reveal">
    <div><div className="section-label"><span /><p>Your next project</p></div><h2 id="project-title">Better spaces. <em>Made possible.</em></h2><p>One classroom or an entire institution. Let’s bring your vision to life.</p></div>
    <motion.a href="#contact" className="btn-primary" whileHover={reduced ? {} : { y: -4 }} whileTap={{ scale: .98 }}><span>Discuss your project ↗</span></motion.a>
    <svg className="cta-board-decoration" viewBox="0 0 320 260" fill="none" aria-hidden="true">
      <rect x="30" y="25" width="260" height="165" rx="10" />
      <rect x="42" y="37" width="236" height="141" rx="4" />
      <path d="M160 190v45m-60 10h120M72 82h120M72 108h175M72 134h145" />
    </svg>
  </div></section>;
}

