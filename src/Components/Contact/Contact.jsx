import { Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram, Linkedin, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import './Contact.css'

const Contact = () => {
  const [isSent, setIsSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContact = {
      id: Date.now(),
      fullName: form.name,
      email: form.email,
      mobile_no: form.phone,
      message: form.message,
    };
    const existing = JSON.parse(localStorage.getItem('contacts') || '[]');
    localStorage.setItem('contacts', JSON.stringify([...existing, newContact]));
    window.dispatchEvent(new Event('storage'));
    setIsSent(true);
    setForm({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <div className="contact-page">
      <div className="contact-card-container">
        <div className="contact-grid">
          {/* Info Side */}
          <div className="contact-info-panel">
            <div className="info-header">
              <h2>Get in Touch</h2>
              <p>We'd love to hear from you. Our team is always here to help.</p>
            </div>
            
            <div className="info-list">
              <div className="info-item-modern">
                <div className="icon-circle"><Mail size={20} /></div>
                <div>
                  <label>Email Us</label>
                  <p>hello@harmoni.com</p>
                </div>
              </div>
              <div className="info-item-modern">
                <div className="icon-circle"><Phone size={20} /></div>
                <div>
                  <label>Call Us</label>
                  <p>+91 98765 43210</p>
                </div>
              </div>
              <div className="info-item-modern">
                <div className="icon-circle"><MapPin size={20} /></div>
                <div>
                  <label>Visit Us</label>
                  <p>123 Event Plaza, Ahmedabad, India</p>
                </div>
              </div>
            </div>

            <div className="social-links-modern">
              <a href="#"><Facebook size={20} /></a>
              <a href="#"><Twitter size={20} /></a>
              <a href="#"><Instagram size={20} /></a>
              <a href="#"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Form Side */}
          <div className="contact-form-panel">
            {isSent ? (
              <div className="contact-success-state">
                <CheckCircle size={64} color="#ff8800" />
                <h2>Message Sent!</h2>
                <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                <button onClick={() => setIsSent(false)} className="btn-back">Send Another</button>
              </div>
            ) : (
              <form className="modern-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="input-group">
                    <input type="text" name="name" required placeholder="Full Name" value={form.name} onChange={handleChange} />
                  </div>
                  <div className="input-group">
                    <input type="email" name="email" required placeholder="Email Address" value={form.email} onChange={handleChange} />
                  </div>
                </div>
                <div className="input-group">
                  <input type="tel" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} />
                </div>
                <div className="input-group">
                  <textarea name="message" placeholder="Tell us about your event..." rows="5" required value={form.message} onChange={handleChange}></textarea>
                </div>
                <button type="submit" className="send-btn">
                  Send Message <Send size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
