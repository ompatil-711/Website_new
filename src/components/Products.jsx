import MotionCard from './MotionCard';
import ProductVisual from './ProductVisual';

export default function Products({ onEnquire }) {
  return (<>

<section id="products">
  <div className="products-container">
    <div className="products-header reveal">
      <div className="section-label"><span></span><p>What We Offer</p><span></span></div>
      <h2 className="section-title">The right products.<br /> <em>One trusted partner.</em></h2>
      <p>Premium manufacturing and supply solutions designed for educational institutions, offices, industries, and public facilities.</p>
    </div>
    <div className="products-grid">
      
      <MotionCard className="product-card" index={0}>
        <div className="product-num">01</div>
        <div className="product-art"><ProductVisual type={0} /></div>
        <h3 className="product-title">Writing Boards</h3>
        <p className="product-desc">White Boards, Green Boards, Black Boards, Magnetic Boards, and Ceramic Boards — built for durability and smooth writing experience.</p>
        <button type="button" className="product-arrow" onClick={() => onEnquire("Writing Boards")}>Enquire Now <svg viewBox="0 0 20 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{"width": "20px", "height": "8px", "stroke": "currentColor", "strokeWidth": "1.5"}} aria-hidden="true"><line x1="0" y1="4" x2="16" y2="4"></line><polyline points="12,1 16,4 12,7"></polyline></svg></button>
      </MotionCard>
      
      <MotionCard className="product-card" index={1}>
        <div className="product-num">02</div>
        <div className="product-art"><ProductVisual type={1} /></div>
        <h3 className="product-title">Notice Boards</h3>
        <p className="product-desc">Organized and effective display solutions for educational institutions, offices, and public spaces. Available in various sizes and finishes.</p>
        <button type="button" className="product-arrow" onClick={() => onEnquire("Notice Boards")}>Enquire Now <svg viewBox="0 0 20 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{"width": "20px", "height": "8px", "stroke": "currentColor", "strokeWidth": "1.5"}} aria-hidden="true"><line x1="0" y1="4" x2="16" y2="4"></line><polyline points="12,1 16,4 12,7"></polyline></svg></button>
      </MotionCard>
      
      <MotionCard className="product-card" index={2}>
        <div className="product-num">03</div>
        <div className="product-art"><ProductVisual type={2} /></div>
        <h3 className="product-title">School Furniture</h3>
        <p className="product-desc">High-quality desks, benches, tables, chairs, storage solutions, and customized furniture designed for comfort, durability, and functionality.</p>
        <button type="button" className="product-arrow" onClick={() => onEnquire("School Furniture")}>Enquire Now <svg viewBox="0 0 20 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{"width": "20px", "height": "8px", "stroke": "currentColor", "strokeWidth": "1.5"}} aria-hidden="true"><line x1="0" y1="4" x2="16" y2="4"></line><polyline points="12,1 16,4 12,7"></polyline></svg></button>
      </MotionCard>
      
      <MotionCard className="product-card" index={3}>
        <div className="product-num">04</div>
        <div className="product-art"><ProductVisual type={3} /></div>
        <h3 className="product-title">First Aid / Suggestion / Complaint Boxes</h3>
        <p className="product-desc">Durable, organized, and accessible boxes for safety and communication across schools, offices, industries, and public facilities.</p>
        <button type="button" className="product-arrow" onClick={() => onEnquire("First Aid / Suggestion / Complaint Boxes")}>Enquire Now <svg viewBox="0 0 20 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{"width": "20px", "height": "8px", "stroke": "currentColor", "strokeWidth": "1.5"}} aria-hidden="true"><line x1="0" y1="4" x2="16" y2="4"></line><polyline points="12,1 16,4 12,7"></polyline></svg></button>
      </MotionCard>
      
      <MotionCard className="product-card" index={4}>
        <div className="product-num">05</div>
        <div className="product-art"><ProductVisual type={4} /></div>
        <h3 className="product-title">Stands (Tripod / Four Leg)</h3>
        <p className="product-desc">Engineered for stability, portability, and convenience — ideal for display boards, presentation setups, and professional environments.</p>
        <button type="button" className="product-arrow" onClick={() => onEnquire("Stands (Tripod / Four Leg)")}>Enquire Now <svg viewBox="0 0 20 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{"width": "20px", "height": "8px", "stroke": "currentColor", "strokeWidth": "1.5"}} aria-hidden="true"><line x1="0" y1="4" x2="16" y2="4"></line><polyline points="12,1 16,4 12,7"></polyline></svg></button>
      </MotionCard>
      
      <MotionCard className="product-card" index={5}>
        <div className="product-num">06</div>
        <div className="product-art"><ProductVisual type={5} /></div>
        <h3 className="product-title">Digital Panels</h3>
        <p className="product-desc">Advanced digital panels enhancing interactive learning, presentations, and communication for schools, colleges, offices, and training centers.</p>
        <button type="button" className="product-arrow" onClick={() => onEnquire("Digital Panels")}>Enquire Now <svg viewBox="0 0 20 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{"width": "20px", "height": "8px", "stroke": "currentColor", "strokeWidth": "1.5"}} aria-hidden="true"><line x1="0" y1="4" x2="16" y2="4"></line><polyline points="12,1 16,4 12,7"></polyline></svg></button>
      </MotionCard>
      
      <MotionCard className="product-card" index={6}>
        <div className="product-num">07</div>
        <div className="product-art"><ProductVisual type={6} /></div>
        <h3 className="product-title">Fire Systems</h3>
        <p className="product-desc">Reliable fire safety systems for institutions, commercial spaces, and industrial environments ensuring protection and compliance.</p>
        <button type="button" className="product-arrow" onClick={() => onEnquire("Fire Systems")}>Enquire Now <svg viewBox="0 0 20 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{"width": "20px", "height": "8px", "stroke": "currentColor", "strokeWidth": "1.5"}} aria-hidden="true"><line x1="0" y1="4" x2="16" y2="4"></line><polyline points="12,1 16,4 12,7"></polyline></svg></button>
      </MotionCard>
      
      <MotionCard className="product-card" index={7}>
        <div className="product-num">08</div>
        <div className="product-art"><ProductVisual type={7} /></div>
        <h3 className="product-title">Chemistry / Biology Lab Setup</h3>
        <p className="product-desc">Complete lab infrastructure solutions including furniture, equipment arrangements for schools, colleges, and educational institutions.</p>
        <button type="button" className="product-arrow" onClick={() => onEnquire("Chemistry / Biology Lab Setup")}>Enquire Now <svg viewBox="0 0 20 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{"width": "20px", "height": "8px", "stroke": "currentColor", "strokeWidth": "1.5"}} aria-hidden="true"><line x1="0" y1="4" x2="16" y2="4"></line><polyline points="12,1 16,4 12,7"></polyline></svg></button>
      </MotionCard>
      
      <MotionCard className="product-card" index={8}>
        <div className="product-num">09</div>
        <div className="product-art"><ProductVisual type={8} /></div>
        <h3 className="product-title">Mic / Podium</h3>
        <p className="product-desc">Professional microphone systems and podiums for seminars, classrooms, conferences, and institutional use — functional and elegant.</p>
        <button type="button" className="product-arrow" onClick={() => onEnquire("Mic / Podium")}>Enquire Now <svg viewBox="0 0 20 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{"width": "20px", "height": "8px", "stroke": "currentColor", "strokeWidth": "1.5"}} aria-hidden="true"><line x1="0" y1="4" x2="16" y2="4"></line><polyline points="12,1 16,4 12,7"></polyline></svg></button>
      </MotionCard>
      
      <MotionCard className="product-card" index={9}>
        <div className="product-num">10</div>
        <div className="product-art"><ProductVisual type={9} /></div>
        <h3 className="product-title">Accessories</h3>
        <p className="product-desc">A wide variety of accessories complementing educational, office, and institutional requirements — ensuring complete setup under one roof.</p>
        <button type="button" className="product-arrow" onClick={() => onEnquire("Accessories")}>Enquire Now <svg viewBox="0 0 20 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{"width": "20px", "height": "8px", "stroke": "currentColor", "strokeWidth": "1.5"}} aria-hidden="true"><line x1="0" y1="4" x2="16" y2="4"></line><polyline points="12,1 16,4 12,7"></polyline></svg></button>
      </MotionCard>
      <div className="catalogue-help">
        <div className="section-label"><span /><p>Complete institutional solutions</p></div>
        <h3>Planning a bigger project?</h3>
        <p>Bring your requirements together with one experienced supply partner. We’ll help you choose the right products for your space.</p>
        <a href="#contact" className="btn-primary"><span>Discuss your requirements ↗</span></a>
      </div>
    </div>
  </div>
</section>


  </>);
}

