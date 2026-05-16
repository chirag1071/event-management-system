import React, { useState, useEffect } from 'react'
import './Events.css'
import { Link, useSearchParams } from 'react-router-dom'
import { Calendar, MapPin, ArrowRight, Tag, Trash2 } from 'lucide-react'
import BookingModal from '../BookingModal/BookingModal'

const defaultEvents = [
  // Cricket
  {
    id: 'default-1',
    name: "INDIAN PREMIER LEAGUE",
    location: "Motera Stadium, Ahmedabad",
    date: "March 15, 2025",
    time: "19:32",
    price: "2499",
    category: "Cricket",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80",
    link: "/cricket"
  },
  {
    id: 'default-2',
    name: "WOMEN PREMIER LEAGUE",
    location: "Wankhede Stadium, Mumbai",
    date: "February 22, 2025",
    time: "07:30",
    price: "599",
    category: "Cricket",
    image: "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=800&q=80",
  },
  // Wedding
  {
    id: 'default-5',
    name: "ROYAL BEACH WEDDING",
    location: "Juhu Beach, Mumbai",
    date: "April 20, 2025",
    time: "18:00",
    price: "15000",
    category: "Wedding",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80",
  },
  {
    id: 'default-6',
    name: "GARDEN LUXURY WEDDING",
    location: "Taj Hotel Gardens, Delhi",
    date: "May 10, 2025",
    time: "17:00",
    price: "25000",
    category: "Wedding",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
  },
  // Birthday
  {
    id: 'default-7',
    name: "KIDS BIRTHDAY BLAST",
    location: "Fun World, Ahmedabad",
    date: "March 25, 2025",
    time: "11:00",
    price: "999",
    category: "Birthday",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
  {
    id: 'default-8',
    name: "SURPRISE BIRTHDAY PARTY",
    location: "The Grand Ballroom, Surat",
    date: "April 5, 2025",
    time: "20:00",
    price: "1499",
    category: "Birthday",
    image: "https://images.unsplash.com/photo-1602631985686-1bb0e6a8696e?w=800&q=80",
  },
  // Office Party
  {
    id: 'default-9',
    name: "ANNUAL CORPORATE NIGHT",
    location: "Hyatt Regency, Ahmedabad",
    date: "December 20, 2024",
    time: "19:00",
    price: "2000",
    category: "Office Party",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
  },
  {
    id: 'default-10',
    name: "TEAM CELEBRATION BASH",
    location: "Radisson Blu, Vadodara",
    date: "January 15, 2025",
    time: "18:30",
    price: "1200",
    category: "Office Party",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80",
  },
  // DJ Party
  {
    id: 'default-11',
    name: "NIGHT FEVER DJ BASH",
    location: "Club Cabana, Mumbai",
    date: "March 29, 2025",
    time: "22:00",
    price: "1800",
    category: "DJ Party",
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=80",
  },
  {
    id: 'default-12',
    name: "SUNBURN FESTIVAL DJ",
    location: "Vagator Beach, Goa",
    date: "April 12, 2025",
    time: "21:00",
    price: "3500",
    category: "DJ Party",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
  },
  // Festival
  {
    id: 'default-13',
    name: "NAVRATRI GARBA NIGHT",
    location: "GMDC Ground, Ahmedabad",
    date: "October 2, 2025",
    time: "20:00",
    price: "500",
    category: "Festival",
    image: "https://images.unsplash.com/photo-1567591370429-c3c3e1e5b3e4?w=800&q=80",
  },
  {
    id: 'default-14',
    name: "HOLI COLOR FESTIVAL",
    location: "Sabarmati Riverfront, Ahmedabad",
    date: "March 14, 2025",
    time: "09:00",
    price: "399",
    category: "Festival",
    image: "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&q=80",
  },
  // Music
  {
    id: 'default-15',
    name: "ARIJIT SINGH LIVE CONCERT",
    location: "NSCI Dome, Mumbai",
    date: "May 3, 2025",
    time: "19:00",
    price: "4999",
    category: "Music",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
  },
  {
    id: 'default-16',
    name: "BOLLYWOOD MUSIC NIGHT",
    location: "Palace Grounds, Bangalore",
    date: "June 7, 2025",
    time: "18:00",
    price: "2999",
    category: "Music",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",
  },
  // Corporate
  {
    id: 'default-17',
    name: "STARTUP SUMMIT 2025",
    location: "GIFT City, Gandhinagar",
    date: "April 18, 2025",
    time: "10:00",
    price: "3000",
    category: "Corporate",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80",
  },
  {
    id: 'default-18',
    name: "BUSINESS AWARDS GALA",
    location: "ITC Narmada, Ahmedabad",
    date: "May 22, 2025",
    time: "19:30",
    price: "5000",
    category: "Corporate",
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80",
  },
];

const Events = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [adminEvents, setAdminEvents] = useState(() =>
    JSON.parse(localStorage.getItem('events') || '[]')
  );
  const [deletedIds, setDeletedIds] = useState(() =>
    JSON.parse(localStorage.getItem('deletedEvents') || '[]')
  );
  const [deleteAlert, setDeleteAlert] = useState('');
  const [bookingEvent, setBookingEvent] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm('Delete this event?')) {
      if (String(id).startsWith('default')) {
        // For default events, save id to deletedIds list
        const updated = [...deletedIds, id];
        localStorage.setItem('deletedEvents', JSON.stringify(updated));
        setDeletedIds(updated);
      } else {
        // For admin events, remove from localStorage
        const updated = adminEvents.filter(e => e.id !== id);
        localStorage.setItem('events', JSON.stringify(updated));
        setAdminEvents(updated);
        window.dispatchEvent(new Event('storage'));
      }
      setDeleteAlert('🗑️ Event deleted successfully!');
      setTimeout(() => setDeleteAlert(''), 3000);
    }
  };

  useEffect(() => {
    const loadEvents = () => {
      const saved = JSON.parse(localStorage.getItem('events') || '[]');
      setAdminEvents(saved);
    };
    loadEvents();
    window.addEventListener('storage', loadEvents);
    const interval = setInterval(loadEvents, 1000);
    return () => {
      window.removeEventListener('storage', loadEvents);
      clearInterval(interval);
    };
  }, []);

  const allEvents = [...defaultEvents.filter(e => !deletedIds.includes(e.id)), ...adminEvents];
  const categories = ['All', ...new Set(allEvents.map(e => e.category).filter(Boolean))];

  // Always read filter directly from URL — single source of truth
  const activeFilter = searchParams.get('category') || 'All';

  const filtered = activeFilter === 'All'
    ? allEvents
    : allEvents.filter(e => e.category?.toLowerCase() === activeFilter.toLowerCase());

  const handleFilter = (cat) => {
    if (cat === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  return (
    <div className="events-page">
      <section className="events-header">
        <h1>Discover All <span className="highlight">Upcoming Events</span></h1>
        <p>Book your tickets now for the best experiences across the country.</p>
      </section>

      {deleteAlert && <div className="delete-alert">{deleteAlert}</div>}

      {/* Category Filter */}
      <div className="events-filter">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${activeFilter.toLowerCase() === cat.toLowerCase() ? 'active' : ''}`}
            onClick={() => handleFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Active filter label */}
      {activeFilter !== 'All' && (
        <div className="active-filter-label">
          Showing events for: <strong>{activeFilter}</strong>
          <button onClick={() => handleFilter('All')}>✕ Clear</button>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="no-events">
          <span>🎟️</span>
          <p>No events found for <strong>"{activeFilter}"</strong> category.</p>
          <button className="filter-btn active" onClick={() => handleFilter('All')}>Show All Events</button>
        </div>
      ) : (
        <div className="events-grid">
          {filtered.map((event) => (
            <div key={event.id} className="event-pass">
              <div className="pass-image">
                <img src={event.image} alt={event.name} />
                <div className="price-badge">₹{event.price}</div>
              </div>
              <div className="pass-content">
                <div className="pass-meta">
                  <span className="meta-item"><Calendar size={14} /> {event.date}</span>
                  <span className="meta-item"><MapPin size={14} /> {event.location}</span>
                </div>
                {event.category && (
                  <span className="event-category-tag">
                    <Tag size={11} /> {event.category}
                  </span>
                )}
                <h3>{event.name}</h3>
                {event.description && <p className="event-desc">{event.description}</p>}
                <div className="pass-actions">
                  <button className="pass-btn" onClick={() => setBookingEvent(event)}>
                    Book Ticket <ArrowRight size={16} />
                  </button>
                  <button className="pass-delete-btn" onClick={() => handleDelete(event.id)}>
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              <div className="pass-side-decor">
                <span>ENTRY PASS</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {bookingEvent && (
        <BookingModal event={bookingEvent} onClose={() => setBookingEvent(null)} />
      )}
    </div>
  )
}

export default Events
