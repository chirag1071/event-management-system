import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { Users, Calendar, Image, MessageSquare, TrendingUp, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({ users: 0, events: 0, gallery: 0, contacts: 0, bookings: 0, categories: 0 });

  useEffect(() => {
    const load = () => {
      setStats({
        users:      JSON.parse(localStorage.getItem('users')          || '[]').length,
        events:     JSON.parse(localStorage.getItem('events')         || '[]').length,
        gallery:    JSON.parse(localStorage.getItem('gallery')        || '[]').length,
        contacts:   JSON.parse(localStorage.getItem('contacts')       || '[]').length,
        bookings:   JSON.parse(localStorage.getItem('mybookings')     || '[]').length,
        categories: JSON.parse(localStorage.getItem('adminCategories')|| '[]').length,
      });
    };
    load();
    const interval = setInterval(load, 1000);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    { label: 'Registered Users',  value: stats.users,      icon: <Users size={28} />,        color: '#3b82f6', link: '/admin' },
    { label: 'Events Posted',     value: stats.events,     icon: <Calendar size={28} />,     color: '#ff8800', link: '/admin/eventpost' },
    { label: 'Gallery Images',    value: stats.gallery,    icon: <Image size={28} />,        color: '#8b5cf6', link: '/admin/galleryes' },
    { label: 'Contact Messages',  value: stats.contacts,   icon: <MessageSquare size={28} />,color: '#10b981', link: '/admin/contactlist' },
    { label: 'Total Bookings',    value: stats.bookings,   icon: <ShoppingBag size={28} />,  color: '#ef4444', link: '/admin' },
    { label: 'Event Categories',  value: stats.categories, icon: <TrendingUp size={28} />,   color: '#f59e0b', link: '/admin/postcategory' },
  ];

  const recentContacts = JSON.parse(localStorage.getItem('contacts') || '[]').slice(-3).reverse();
  const recentEvents   = JSON.parse(localStorage.getItem('events')   || '[]').slice(-3).reverse();

  return (
    <div className="dashboard">
      <div className="dash-header">
        <h1>Dashboard</h1>
        <p>Welcome back, Admin! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {cards.map((card, i) => (
          <Link to={card.link} className="stat-card" key={i} style={{ '--accent': card.color }}>
            <div className="stat-icon-wrap" style={{ background: `${card.color}18`, color: card.color }}>
              {card.icon}
            </div>
            <div className="stat-info">
              <span className="stat-value">{card.value}</span>
              <span className="stat-label">{card.label}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="dash-bottom">
        {/* Recent Events */}
        <div className="dash-card">
          <div className="dash-card-header">
            <h3>Recent Events</h3>
            <Link to="/admin/eventpost">View All</Link>
          </div>
          {recentEvents.length === 0 ? (
            <p className="dash-empty">No events posted yet.</p>
          ) : (
            recentEvents.map(e => (
              <div className="dash-list-item" key={e.id}>
                <img src={e.image} alt={e.name} className="dash-item-img" />
                <div>
                  <p className="dash-item-title">{e.name}</p>
                  <p className="dash-item-sub">📍 {e.location} • ₹{e.price}</p>
                </div>
                <span className="dash-item-badge">{e.category}</span>
              </div>
            ))
          )}
        </div>

        {/* Recent Messages */}
        <div className="dash-card">
          <div className="dash-card-header">
            <h3>Recent Messages</h3>
            <Link to="/admin/contactlist">View All</Link>
          </div>
          {recentContacts.length === 0 ? (
            <p className="dash-empty">No messages yet.</p>
          ) : (
            recentContacts.map(c => (
              <div className="dash-list-item" key={c.id}>
                <div className="dash-avatar">{c.fullName?.charAt(0)}</div>
                <div>
                  <p className="dash-item-title">{c.fullName}</p>
                  <p className="dash-item-sub">{c.message?.slice(0, 50)}...</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
