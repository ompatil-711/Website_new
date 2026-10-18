
export default function LocationMap() {
  return (<>

<div className="map-section">
  <iframe tabIndex={-1} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d284.49038693327546!2d79.10379322!3d21.15654892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c1b1989440d5%3A0x1c7988fdeb64e473!2sDahikar%20catering!5e0!3m2!1sen!2sin!4v1700000000000" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Paradise Enterprise location in Nagpur">
  </iframe>
  <div className="map-overlay"></div>
  <div className="map-label">
    <h4>Paradise Enterprise</h4>
    <p>Nagpur, Maharashtra · India</p>
    <a href="https://www.google.com/maps/place/Dahikar+catering/@21.1565489,79.1037932,19.86z" target="_blank" rel="noopener noreferrer">Get directions ↗</a>
  </div>
</div>


  </>);
}
