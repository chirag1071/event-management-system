import React from 'react'
import './About.css'
import { Target, Eye, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const services = [
  { icon: '🎊', title: 'Beach Wedding', desc: 'Romantic seaside ceremonies with breathtaking ocean views and elegant setups.', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80' },
  { icon: '🏢', title: 'Office Party', desc: 'Professional corporate events that boost team morale and celebrate achievements.', img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80' },
  { icon: '🎂', title: 'Birthday Party', desc: 'Unforgettable birthday celebrations tailored to every age and personality.', img: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=600&q=80' },
];

const expertise = [
  "Strategic Venue Sourcing", "Creative Theme Design", "Technical Production",
  "Vendor Management", "On-site Coordination", "Catering Excellence",
  "Media & Coverage", "Guest Concierge"
];

const About = () => {
  return (
    <div className="about-container">
      {/* Banner */}
      <section className="about-banner">
        <div className="banner-content">
          <span className="banner-tag">Get to know us</span>
          <h1>ALL YOU NEED TO KNOW <br/> <span className="highlight">ABOUT HARMONI</span></h1>
          <nav className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span> About Us
          </nav>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="vision-mission">
        <div className="vm-grid">
          <div className="vm-card main-info">
            <span className="small-tag">We are harmoni</span>
            <h2>No.1 Events <br/> Management Agency</h2>
            <p>Creating seamless experiences that leave lasting impressions since 2015.</p>
            <button className="btn-outline">LEARN MORE</button>
          </div>
          
          <div className="vm-card hover-card">
            <div className="icon-box"><Target size={32} /></div>
            <h3>Our Mission</h3>
            <p>To deliver exceptional event solutions through creative innovation, precise planning, and a client-first approach that turns every occasion into a masterpiece.</p>
          </div>

          <div className="vm-card hover-card">
            <div className="icon-box"><Eye size={32} /></div>
            <h3>Our Vision</h3>
            <p>To be the world's most trusted partner in event management, setting new standards for luxury, accessibility, and unforgettable celebrations.</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="section-head">
          <span className="section-tag">What We Offer</span>
          <h2>Our Signature Events</h2>
          <p>From intimate gatherings to grand celebrations, we craft every moment with perfection.</p>
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <div className="service-card" key={i}>
              <div className="service-img-wrap">
                <img src={s.img} alt={s.title} />
                <div className="service-overlay">
                  <span className="service-icon">{s.icon}</span>
                </div>
              </div>
              <div className="service-body">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <button className="service-btn">Explore →</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Expertise Section */}
      <section className="expertise">
        <div className="section-head">
          <span className="section-tag">Why Choose Us</span>
          <h2>Our Excellence</h2>
          <p>Why thousands of clients trust Harmoni for their most precious moments.</p>
        </div>
        <div className="expertise-grid">
          {expertise.map((item, index) => (
            <div key={index} className="expertise-item">
              <CheckCircle size={20} className="check-icon" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default About
