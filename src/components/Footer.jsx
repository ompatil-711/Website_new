
export default function Footer() {
  return (<>

<footer>
  <div className="footer-container">
    <div className="footer-top">
      <div>
        <a href="#hero" className="nav-logo" style={{"display": "inline-flex"}}>
          <div className="nav-logo-emblem"></div>
          <div className="nav-logo-text">
            <span>Paradise Enterprise</span>
            <span>Est. 2001 · Nagpur</span>
          </div>
        </a>
        <p className="footer-brand-desc">Delivering quality products and building lasting relationships since 2001. Your trusted partner in educational and institutional supply.</p>
        <div style={{"display": "flex", "gap": "12px"}}>
          <a href="https://www.instagram.com/deepdahikar986/" target="_blank" className="social-btn" aria-label="Instagram" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{"width": "18px", "height": "18px"}} aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
        </div>
      </div>
      <div className="footer-col">
        <h5>Products</h5>
        <div className="footer-links">
          <a href="#products">Writing Boards</a>
          <a href="#products">Notice Boards</a>
          <a href="#products">School Furniture</a>
          <a href="#products">Digital Panels</a>
          <a href="#products">Fire Systems</a>
          <a href="#products">Lab Setup</a>
        </div>
      </div>
      <div className="footer-col">
        <h5>Company</h5>
        <div className="footer-links">
          <a href="#story">Our Story</a>
          <a href="#founders">Leadership</a>
          <a href="#why">Why Us</a>
          <a href="#clients">Clients</a>
          <a href="#service">After-Sale Service</a>
        </div>
      </div>
      <div className="footer-col">
        <h5>Contact</h5>
        <div className="footer-links">
          <a href="tel:+919922404078">+91 99224 04078</a>
          <a href="tel:+919822571372">+91 98225 71372</a>
          <a href="mailto:paradisenterprises.dahikar@gmail.com" style={{"wordBreak": "break-all", "fontSize": "11px"}}>paradisenterprises.dahikar@gmail.com</a>
          <a href="https://www.instagram.com/deepdahikar986/" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <div>© {new Date().getFullYear()} <span>Paradise Enterprise</span>. All rights reserved.</div>
      <div>Nagpur, Maharashtra · Est. <span>2001</span></div>
    </div>
  </div>
</footer>


  </>);
}
