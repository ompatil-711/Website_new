import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useSiteReducedMotion } from './MotionPreferences';
import ProductVisual from './ProductVisual';
import BoardPlayground from './BoardPlayground';
import Counter from './Counter';

const stats = [['Years of experience', new Date().getFullYear() - 2001, '+'], ['Product categories', 10, '+'], ['Institutions served', 500, '+'], ['Generations of trust', 2, '']];
const ease = [.22, 1, .36, 1];

export default function ModernHero() {
  const ref = useRef(null);
  const reduced = useSiteReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -55]);
  const enter = (delay = 0) => ({ initial: reduced ? false : { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: .75, delay: reduced ? 0 : 1.1 + delay, ease } });
  return <section ref={ref} id="hero" className="modern-hero">
    <div className="hero-layout">
      <div className="hero-content">
        <motion.div className="hero-eyebrow" {...enter()}><span className="status-dot" /> BUILT FOR AMBITIOUS SPACES <span className="hero-year">EST. 2001</span></motion.div>
        <motion.h1 className="hero-title" {...enter(.08)}>Great spaces.<br /><em>Greater possibilities<span className="orange-period">.</span></em></motion.h1>
        <motion.p className="hero-subtitle" {...enter(.16)}>From the first whiteboard to a fully equipped institution. Discover products that bring your classrooms, workplaces and ideas to life.</motion.p>
        <motion.div className="hero-actions" {...enter(.23)}>
          <motion.a href="#products" className="btn-primary" whileHover={reduced ? {} : { y: -3 }} whileTap={{ scale: .97 }}><span>Discover the collection <b aria-hidden="true">↗</b></span></motion.a>
          <a href="#contact" className="btn-secondary">Let’s talk <span aria-hidden="true">→</span></a>
        </motion.div>
        <motion.div className="hero-assurance" {...enter(.3)}><span>✓ Manufacturing & wholesale</span><span>✓ Installation & support</span></motion.div>
        <motion.div className="hero-audiences" {...enter(.36)}><span>MADE FOR</span><strong>Education</strong><i /><strong>Workplaces</strong><i /><strong>Institutions</strong></motion.div>
      </div>
      <motion.div className="hero-mosaic" style={{ y: reduced ? 0 : visualY }} {...enter(.15)}>
        <BoardPlayground />
        <a className="mosaic-small mosaic-furniture" href="#products"><div><span>BUILT FOR EVERY DAY</span><h2>Better places<br />to learn.</h2></div><ProductVisual type={2} decorative /><span className="mosaic-small-link">School furniture <b>↗</b></span></a>
        <a className="mosaic-small mosaic-digital" href="#products"><div><span>THINK FORWARD</span><h2>Make learning<br />interactive.</h2></div><ProductVisual type={5} decorative /><span className="mosaic-small-link">Digital solutions <b>↗</b></span></a>
      </motion.div>
    </div>
    <motion.div className="hero-stats" {...enter(.4)}>{stats.map(([label, value, suffix]) => <div className="hero-stat" key={label}><div className="hero-stat-num"><Counter target={value} /><sup>{suffix}</sup></div><div className="hero-stat-label">{label}</div></div>)}</motion.div>
  </section>;
}

