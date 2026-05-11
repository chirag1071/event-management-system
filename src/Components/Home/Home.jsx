import React from 'react'
import './Home.css'
import { ArrowRight, Star, Users, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>One Stop Event <span className="text-gradient">Planet</span></h1>
          <p>
            Transforming your visions into unforgettable realities. From intimate gatherings to 
            grand celebrations, we handle every detail with precision and creativity.
          </p>
          <div className="hero-actions">
            <div className="search-box-modern">
              <input type="email" placeholder="Enter your email for a free quote" />
              <Link to="/register" className="hero-cta-btn">Get Started <ArrowRight size={18} /></Link>
            </div>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <Users size={20} className="stat-icon" />
              <span>16k+ Happy Clients</span>
            </div>
            <div className="stat-item">
              <Star size={20} className="stat-icon" />
              <span>4.9/5 Rating</span>
            </div>
          </div>
        </div>
        <div className="hero-image-container">
          <div className="glass-card floating">
            <Calendar size={40} color="#ff8800" />
            <div className="glass-text">
              <strong>Next Big Event</strong>
              <span>IPL Final 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Brief Section */}
      <section className="about-brief">
        <div className="section-header">
          <span className="section-tag">What we do</span>
          <h2>Beyond Your Imagination</h2>
        </div>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper">🚀</div>
            <h3>Smart Planning</h3>
            <p>AI-driven coordination and real-time updates for every event phase.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">💡</div>
            <h3>Creative Design</h3>
            <p>Unique themes and decor that reflect your personality and brand.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">🎓</div>
            <h3>Expert Execution</h3>
            <p>Professional team with over 10 years of experience in luxury events.</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-showcase">
        <div className="services-inner">
          <div className="services-text">
            <h2>Luxury Services <br/> Under One Roof</h2>
            <p>We provide end-to-end solutions for all your celebration needs.</p>
            <ul className="services-list">
              <li><Star size={16} /> Premium Photography & Cinematography</li>
              <li><Star size={16} /> Full Venue & Home Decoration</li>
              <li><Star size={16} /> Gourmet Catering Solutions</li>
              <li><Star size={16} /> VIP Guest Management</li>
            </ul>
            <Link to="/event" className="btn-secondary">Explore All Services</Link>
          </div>
          <div className="services-cta-card">
            <p>Request Early Access</p>
            <h3>Register Today & start exploring the endless possibilities.</h3>
            <button className="btn-primary-dark" onClick={() => window.location.href='/register'}>REGISTER NOW</button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
