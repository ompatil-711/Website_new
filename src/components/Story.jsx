
export default function Story() {
  return (<>

<section id="story">
  <div className="story-container">
    <div className="story-header reveal">
      <div className="section-label"><span></span><p>Our Journey</p><span></span></div>
      <h2 className="section-title">Built on trust. <em>Since 2001.</em></h2>
      <p className="lead">Two decades of trust, craftsmanship, and service — a story carried forward by family, passion, and purpose.</p>
    </div>

    <div className="timeline">
      <div className="timeline-item reveal">
        <div className="timeline-content">
          <div className="timeline-tag">The Beginning</div>
          <h3>A Vision Takes Shape</h3>
          <p>Paradise Enterprise was founded with a clear mission — to deliver quality products while building long-lasting relationships based on trust, integrity, and commitment to excellence.</p>
        </div>
        <div className="timeline-node">
          <div className="timeline-dot"><div className="timeline-dot-inner">2001</div></div>
          <div className="timeline-year">Foundation Year</div>
        </div>
        <div className="timeline-empty"></div>
      </div>

      <div className="timeline-item reveal" style={{"transitionDelay": "0.15s"}}>
        <div className="timeline-empty"></div>
        <div className="timeline-node">
          <div className="timeline-dot"><div className="timeline-dot-inner">★</div></div>
          <div className="timeline-year">The Architect</div>
        </div>
        <div className="timeline-content">
          <div className="timeline-tag">Founding Leadership</div>
          <h3>Pramod M. Dahikar — The Cornerstone</h3>
          <p>Mr. Pramod M. Dahikar's unwavering dedication, hard work and perseverance became the driving force behind the company's growth. His leadership values and commitment to excellence continue to shape the identity and success of the organization.</p>
        </div>
      </div>

      <div className="timeline-item reveal" style={{"transitionDelay": "0.3s"}}>
        <div className="timeline-content">
          <div className="timeline-tag">Growth Era</div>
          <h3>Two Decades of Trust</h3>
          <p>Through consistent efforts and relentless focus on quality, Paradise Enterprise grew into a trusted name in manufacturing and wholesale — serving schools, colleges, offices, and institutions across the region.</p>
        </div>
        <div className="timeline-node">
          <div className="timeline-dot"><div className="timeline-dot-inner">20Y</div></div>
          <div className="timeline-year">Two Decades</div>
        </div>
        <div className="timeline-empty"></div>
      </div>

      <div className="timeline-item reveal" style={{"transitionDelay": "0.45s"}}>
        <div className="timeline-empty"></div>
        <div className="timeline-node">
          <div className="timeline-dot"><div className="timeline-dot-inner">2021</div></div>
          <div className="timeline-year">New Chapter</div>
        </div>
        <div className="timeline-content">
          <div className="timeline-tag">Next Generation</div>
          <h3>Deep P. Dahikar — The Future</h3>
          <p>In 2021, the torch was passed forward as Deep P. Dahikar joined the enterprise. Bringing fresh ideas, modern outlook, and the same deep-rooted passion, he continues the legacy while driving new growth and innovation.</p>
        </div>
      </div>

      <div className="timeline-item reveal" style={{"transitionDelay": "0.6s"}}>
        <div className="timeline-content">
          <div className="timeline-tag">Today</div>
          <h3>Symbol of Quality &amp; Reliability</h3>
          <p>Today, with over two decades of experience, Paradise Enterprise proudly stands as a symbol of quality, reliability, and continuous progress — combining experience, innovation, and commitment to serve customers with trust.</p>
        </div>
        <div className="timeline-node">
          <div className="timeline-dot"><div className="timeline-dot-inner">Now</div></div>
          <div className="timeline-year">Present Day</div>
        </div>
        <div className="timeline-empty"></div>
      </div>
    </div>
  </div>
</section>


  </>);
}
