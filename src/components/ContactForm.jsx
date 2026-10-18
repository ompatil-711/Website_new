import { useEffect, useState } from 'react';

const categories = ['Writing Boards', 'Notice Boards', 'School Furniture', 'First Aid / Suggestion / Complaint Boxes', 'Stands (Tripod / Four Leg)', 'Digital Panels', 'Fire Systems', 'Chemistry / Biology Lab Setup', 'Mic / Podium', 'Accessories', 'General Inquiry'];

export default function ContactForm({ interest }) {
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  useEffect(() => { setCategory(interest.category); setStatus(''); }, [interest]);
  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = `Name: ${data.get('name')}\nPhone: ${data.get('phone')}\nEmail: ${data.get('email')}\nInterest: ${category}\n\n${data.get('message')}`;
    window.location.href = `mailto:paradisenterprises.dahikar@gmail.com?subject=${encodeURIComponent('Website enquiry: ' + category)}&body=${encodeURIComponent(body)}`;
    setStatus('Your email app has been requested. Please send the draft there to complete your enquiry. If it does not open, contact us using the email or phone details alongside.');
  }
  return <form className="contact-form reveal-right" onSubmit={submit}>
    <h3>Send Us a Message</h3>
    <div className="form-row">
      <div className="form-group"><label htmlFor="enquiry-name">Your Name</label><input id="enquiry-name" name="name" autoComplete="name" placeholder="Full Name" required maxLength={100} /></div>
      <div className="form-group"><label htmlFor="enquiry-phone">Phone Number</label><input id="enquiry-phone" name="phone" type="tel" autoComplete="tel" placeholder="+91 00000 00000" required pattern="[+0-9() .-]{7,20}" title="Enter a phone number with 7 to 20 characters" /></div>
    </div>
    <div className="form-group"><label htmlFor="enquiry-email">Email Address</label><input id="enquiry-email" name="email" type="email" autoComplete="email" placeholder="your@email.com" required maxLength={200} /></div>
    <div className="form-group"><label htmlFor="enquiry-category">Product / Service Interest</label><select id="enquiry-category" name="category" value={category} onChange={event => setCategory(event.target.value)} required><option value="">Select a category</option>{categories.map(item => <option key={item}>{item}</option>)}</select></div>
    <div className="form-group"><label htmlFor="enquiry-message">Message</label><textarea id="enquiry-message" name="message" placeholder="Tell us about your requirements..." required maxLength={3000} /></div>
    <p className="form-note">This opens your email app with your enquiry ready to send.</p>
    <button className="form-submit" type="submit">Prepare Email Enquiry →</button>
    <p className="form-status" role="status">{status}</p>
  </form>;
}
