import MotionCard from './MotionCard';

export default function Founders() {
  return (<>

<section id="founders">
  <div className="founders-container">
    <div className="founders-header reveal">
      <div className="section-label"><span></span><p>The Pillars</p><span></span></div>
      <h2 className="section-title">The people <em>behind Paradise.</em></h2>
      <p className="founders-quote">Built on dedication since 2001, strengthened through experience, and carried forward by the next generation.</p>
    </div>
    <div className="founders-grid">
      <MotionCard className="founder-card" index={0}>
        <div className="founder-num">01</div>
        <div className="founder-era">Est. 2001</div>
        <h3 className="founder-name">Pramod M. Dahikar</h3>
        <div className="founder-role">Founder &amp; Visionary</div>
        <p className="founder-bio">The cornerstone of Paradise Enterprise. Mr. Pramod M. Dahikar's hard work, perseverance, and unwavering dedication have been the driving force behind the company's growth since its inception. His leadership, values, and commitment to excellence continue to shape the identity and success of the organization across generations.</p>
        <div className="founder-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{"width": "24px", "height": "24px", "stroke": "var(--gold)"}} aria-hidden="true">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
          </svg>
        </div>
      </MotionCard>
      <MotionCard className="founder-card" index={1}>
        <div className="founder-num">02</div>
        <div className="founder-era">Joined 2021</div>
        <h3 className="founder-name">Deep P. Dahikar</h3>
        <div className="founder-role">Next Generation Leader</div>
        <p className="founder-bio">Carrying forward the legacy with pride and purpose. Deep P. Dahikar joined the organization in 2021, playing a vital role in strengthening operations, driving growth, and contributing to the company's future vision. Bringing fresh ideas and a modern outlook, he continues the tradition of excellence on which the business was built.</p>
        <div className="founder-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{"width": "24px", "height": "24px", "stroke": "var(--gold)"}} aria-hidden="true">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
        </div>
      </MotionCard>
    </div>
  </div>
</section>


  </>);
}
