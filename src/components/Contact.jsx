import ContactForm from './ContactForm';

export default function Contact({ interest }) {
  return (<>

<section id="contact">
  <div className="contact-container">
    <div className="contact-inner">
      <div className="contact-left reveal-left">
        <div className="section-label"><span></span><p>Get in Touch</p></div>
        <h2 className="section-title">Let’s equip <em>your next space.</em></h2>
        <p>Whether you're setting up a school, office, or institution — we have the products, expertise, and commitment to make your vision a reality. Reach out today.</p>
        <div className="contact-details">
          <div className="contact-item">
            <div className="contact-item-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </div>
            <div>
              <div className="contact-item-label">Phone</div>
              <div className="contact-item-val"><a href="tel:+919922404078">+91 99224 04078</a></div>
              <div className="contact-item-val" style={{"fontSize": "15px", "opacity": "0.6"}}><a href="tel:+919822571372">+91 98225 71372</a></div>
            </div>
          </div>
          <div className="contact-item">
            <div className="contact-item-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </div>
            <div>
              <div className="contact-item-label">Email</div>
              <div className="contact-item-val"><a href="mailto:paradisenterprises.dahikar@gmail.com">paradisenterprises.dahikar@gmail.com</a></div>
            </div>
          </div>
          <div className="contact-item">
            <div className="contact-item-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
            <div>
              <div className="contact-item-label">Location</div>
              <div className="contact-item-val"><a href="https://www.google.com/maps/place/Dahikar+catering/@21.1565489,79.1037932,19.86z" target="_blank" rel="noopener noreferrer">Dahikar Premises, Nagpur, Maharashtra</a></div>
            </div>
          </div>
        </div>
        <div className="contact-social">
          <a href="https://www.instagram.com/deepdahikar986/" target="_blank" className="social-btn" title="Instagram" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="tel:+919922404078" className="social-btn" title="Call">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          </a>
          <a href="mailto:paradisenterprises.dahikar@gmail.com" className="social-btn" title="Email">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          </a>
        </div>
      </div>
<ContactForm interest={interest} />
    </div>
  </div>
</section>


  </>);
}
