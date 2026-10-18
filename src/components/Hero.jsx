import Counter from './Counter';
import Particles from './Particles';

export default function Hero() {
  return (<>

<section id="hero">
  <div className="hero-bg"></div>
  <div className="hero-grid"></div>
  <div className="hero-orb hero-orb-1"></div>
  <div className="hero-orb hero-orb-2"></div>
  <Particles />
  <div className="hero-content">
    <div className="hero-eyebrow">
      <span></span>
      <p>Established 2001 · Nagpur, Maharashtra</p>
      <span></span>
    </div>
    <h1 className="hero-title">
      Paradise<br /><em>Enterprise</em>
    </h1>
    <p className="hero-subtitle">Built on dedication since 2001, strengthened through experience, and carried forward by the next generation.</p>
    <div className="hero-actions">
      <a href="#products" className="btn-primary"><span>Explore Products</span></a>
      <a href="#story" className="btn-secondary">Our Legacy</a>
    </div>
  </div>
  <div className="hero-stats">
    <div className="hero-stat">
      <div className="hero-stat-num"><Counter target={new Date().getFullYear() - 2001} /><sup>+</sup></div>
      <div className="hero-stat-label">Years of Excellence</div>
    </div>
    <div className="hero-stat">
      <div className="hero-stat-num"><Counter target={10} /><sup>+</sup></div>
      <div className="hero-stat-label">Product Categories</div>
    </div>
    <div className="hero-stat">
      <div className="hero-stat-num"><Counter target={500} /><sup>+</sup></div>
      <div className="hero-stat-label">Institutions Served</div>
    </div>
    <div className="hero-stat">
      <div className="hero-stat-num"><Counter target={2} /></div>
      <div className="hero-stat-label">Generations of Trust</div>
    </div>
  </div>
  <div className="hero-scroll">
    <div className="scroll-line"></div>
    <span>Scroll</span>
  </div>
</section>


  </>);
}
