import React, { useState, useEffect } from 'react'
import './Event.css'
import { useNavigate } from 'react-router-dom';

const defaultCategories = [
  { title: "Cricket",      img: "https://images.unsplash.com/photo-1540747913346-19212a4b423e?w=800&q=80" },
  { title: "Office Party", img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80" },
  { title: "Festival",     img: "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&q=80" },
  { title: "Wedding",      img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80" },
  { title: "Birthday",     img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" },
  { title: "DJ Party",     img: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=80" },
  { title: "Corporate",    img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80" },
  { title: "Music",        img: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80" },
];

const Event = () => {
  const navigate = useNavigate();
  const [extraCategories, setExtraCategories] = useState([]);

  useEffect(() => {
    // Load any new categories added by admin via events
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    const existingTitles = defaultCategories.map(c => c.title.toLowerCase());
    const newCats = [];
    events.forEach(e => {
      if (e.category && !existingTitles.includes(e.category.toLowerCase()) &&
          !newCats.find(c => c.title.toLowerCase() === e.category.toLowerCase())) {
        newCats.push({
          title: e.category,
          img: e.image || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80'
        });
      }
    });
    setExtraCategories(newCats);
  }, []);

  const allCategories = [...defaultCategories, ...extraCategories];

  return (
    <div className="event-categories-page">
      <section className="categories-header">
        <span className="subtitle">Choose Your Category</span>
        <h1>Exquisite <span className="highlight">Event Types</span></h1>
      </section>

      <div className="category-grid-modern">
        {allCategories.map((cat, index) => (
          <div
            key={index}
            className="category-card"
            onClick={() => navigate(`/events?category=${encodeURIComponent(cat.title)}`)}
          >
            <div className="card-img-wrapper">
              <img src={cat.img} alt={cat.title} />
              <div className="card-overlay">
                <button className="view-all-btn">EXPLORE ALL</button>
              </div>
            </div>
            <div className="card-info">
              <h3>{cat.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Event
