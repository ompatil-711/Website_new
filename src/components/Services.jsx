import MotionCard from './MotionCard';

export default function Services() {
  return (<>

<section id="service">
  <div className="service-container">
    <div className="service-inner">
      <div className="reveal-left">
        <div className="section-label"><span></span><p>After Sales</p></div>
        <h2 className="section-title">Support beyond <em>the sale.</em></h2>
        <p style={{"color": "var(--text-muted)", "fontSize": "14px", "lineHeight": "1.9", "margin": "28px 0 40px"}}>Our relationship with clients doesn't end at delivery. Every product comes with dedicated installation and ongoing support — because your satisfaction is our commitment.</p>
        <div className="service-list">
          <MotionCard className="service-item" index={0}>
            <div className="service-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
            </div>
            <div>
              <h4>Professional Installation</h4>
              <p>Expert installation services for every product — ensuring proper setup, alignment, and functionality from day one.</p>
            </div>
          </MotionCard>
          <MotionCard className="service-item" index={1}>
            <div className="service-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </div>
            <div>
              <h4>Dedicated Support</h4>
              <p>Responsive after-sale support to address any concerns, maintenance needs, or product queries promptly.</p>
            </div>
          </MotionCard>
          <MotionCard className="service-item" index={2}>
            <div className="service-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            <div>
              <h4>Quality Guarantee</h4>
              <p>Every product we supply comes with a quality assurance commitment — backed by two decades of manufacturing expertise.</p>
            </div>
          </MotionCard>
        </div>
      </div>
      <div className="service-visual reveal-right">
        <span className="service-panel-label">FROM FIRST CONVERSATION TO FINAL INSTALLATION</span>
        <h3>Good products.<br /><span>An even better experience.</span></h3>
        <div className="service-steps">
          <div className="service-step"><b>01</b><div><strong>Let’s understand your space.</strong><p>Share your requirements. We help you find the right fit.</p></div></div>
          <div className="service-step"><b>02</b><div><strong>Bring it all together.</strong><p>Coordinated supply and professional installation.</p></div></div>
          <div className="service-step"><b>03</b><div><strong>Count on continued support.</strong><p>A familiar team to turn to, long after delivery.</p></div></div>
        </div>
        <div className="service-panel-footer"><span>THE PARADISE PROMISE</span><span>↗ SINCE 2001</span></div>
      </div>
    </div>
  </div>
</section>


  </>);
}
