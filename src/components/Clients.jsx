import MotionCard from './MotionCard';

export default function Clients() {
  return (<>

<section id="clients">
  <div className="clients-container">
    <div className="clients-header reveal">
      <div className="section-label"><span></span><p>Our Clients</p><span></span></div>
      <h2 className="section-title">Trusted by <em>leading institutions.</em></h2>
    </div>
    <div className="clients-row">
      <MotionCard className="client-badge" index={0}>
        <div className="client-name">Adani Group</div>
        <div className="client-type">Industrial / Corporate</div>
      </MotionCard>
      <MotionCard className="client-badge" index={1}>
        <div className="client-name">Datta Meghe Group</div>
        <div className="client-type">Education &amp; Healthcare</div>
      </MotionCard>
      <MotionCard className="client-badge" index={2}>
        <div className="client-name">Anjuman</div>
        <div className="client-type">Educational Institution</div>
      </MotionCard>
      <MotionCard className="client-badge" index={3}>
        <div className="client-name">Sanskar Vidya</div>
        <div className="client-type">School, Nagpur</div>
      </MotionCard>
      <MotionCard className="client-badge" index={4}>
        <div className="client-name">Govt. Polytechnic</div>
        <div className="client-type">Government Institution</div>
      </MotionCard>
      <MotionCard className="client-badge" index={5}>
        <div className="client-name">Solar Company</div>
        <div className="client-type">Renewable Energy</div>
      </MotionCard>
    </div>
    <div className="testimonial-area reveal" style={{"transitionDelay": "0.3s"}}>
      <p className="testimonial-text">Paradise Enterprise has been our trusted supply partner for years. Their quality products and reliable after-sale service make them our first choice for all institutional requirements.</p>
      <div className="testimonial-src">
        <span></span>
        <p>Client Testimonial — Trusted Partner</p>
        <span></span>
      </div>
    </div>
  </div>
</section>


  </>);
}
