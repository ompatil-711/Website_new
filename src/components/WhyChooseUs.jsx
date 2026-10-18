import MotionCard from './MotionCard';
import { motion } from 'framer-motion';
import { useSiteReducedMotion } from './MotionPreferences';

export default function WhyChooseUs() {
  const reduced = useSiteReducedMotion();
  return (<>

<section id="why">
  <div className="why-container">
    <div className="why-inner">
      <div className="why-left reveal-left">
        <div className="section-label"><span></span><p>Why Paradise</p></div>
        <h2 className="section-title">Experience you can <em>build on.</em></h2>
        <svg className="board-marker-underline" viewBox="0 0 240 20" fill="none" aria-hidden="true"><motion.path d="M5 9Q102 0 232 8M21 16Q120 9 211 14" stroke="#ff6a3d" strokeWidth="4" strokeLinecap="round" initial={reduced ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 1 }} transition={{ duration: .85, delay: .3 }} /></svg>
        <p className="body">We don't just sell products — we build partnerships. Every client relationship is built on our core values of quality, reliability, and after-sales commitment that has defined us for over two decades.</p>
        <a href="#contact" className="btn-primary" style={{"display": "inline-block"}}><span>Get in Touch</span></a>
      </div>
      <div className="why-right">
        <div className="why-large-num reveal">{new Date().getFullYear() - 2001}</div>
        <div className="why-features">
          <MotionCard className="why-feature" index={0}>
            <div className="why-feature-num">01</div>
            <div className="why-feature-body">
              <h4>Over Two Decades of Expertise</h4>
              <p>Since 2001, we have built deep expertise in educational and institutional supply, ensuring every product meets the highest standards.</p>
            </div>
          </MotionCard>
          <MotionCard className="why-feature" index={1}>
            <div className="why-feature-num">02</div>
            <div className="why-feature-body">
              <h4>Premium Quality Manufacturing</h4>
              <p>Every product is crafted for durability, functionality, and long-lasting performance — built to withstand the demands of institutional use.</p>
            </div>
          </MotionCard>
          <MotionCard className="why-feature" index={2}>
            <div className="why-feature-num">03</div>
            <div className="why-feature-body">
              <h4>After-Sale Installation &amp; Service</h4>
              <p>Our commitment doesn't end at delivery. We provide complete installation and after-sale service for every product we supply.</p>
            </div>
          </MotionCard>
          <MotionCard className="why-feature" index={3}>
            <div className="why-feature-num">04</div>
            <div className="why-feature-body">
              <h4>Trusted by Leading Institutions</h4>
              <p>From Adani Group to Datta Meghe, our clients include some of the most reputable institutions in Vidarbha and beyond.</p>
            </div>
          </MotionCard>
          <MotionCard className="why-feature" index={4}>
            <div className="why-feature-num">05</div>
            <div className="why-feature-body">
              <h4>Complete Setup Solutions</h4>
              <p>We offer end-to-end solutions — from a single writing board to full laboratory and classroom infrastructure setups.</p>
            </div>
          </MotionCard>
        </div>
      </div>
    </div>
  </div>
</section>


  </>);
}
