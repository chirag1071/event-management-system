import React, { useState } from 'react'
import './Mybooking.css'
import { MapPin, Calendar, Trash2 } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'

const Barcode = ({ value }) => {
  const str = value.padEnd(20, '0').slice(0, 20);
  const bars = str.split('').map(c => c.charCodeAt(0));
  return (
    <svg width="110" height="40" viewBox="0 0 110 40" xmlns="http://www.w3.org/2000/svg">
      {bars.map((code, i) => {
        const w = (code % 3) + 1;
        const x = i * 5.2;
        return <rect key={i} x={x} y="0" width={w} height="30" fill="#0f172a" />;
      })}
      <text x="55" y="39" textAnchor="middle" fontSize="7" fill="#94a3b8" fontFamily="monospace" letterSpacing="1">{value}</text>
    </svg>
  );
};

const initialBookings = [
  {
    id: "IPL-2025-001",
    location: "Motera Stadium, Ahmedabad",
    dateTime: "March 15, 2025 | 19:32 IST",
    title: "INDIAN PREMIER LEAGUE",
    price: "₹2,499.00",
    section: "VIP EAST",
    row: "GA"
  },
  {
    id: "GPL-2024-042",
    location: "GokulDham Society, Mumbai",
    dateTime: "October 30, 2024 | 09:00 IST",
    title: "GOKULDHAM PREMIER LEAGUE",
    price: "₹200.00",
    section: "GENERAL",
    row: "B-12"
  }
];

function MyBooking() {
  const [bookings, setBookings] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('mybookings') || '[]');
    return saved.length > 0 ? saved : initialBookings;
  });
  const [alert, setAlert] = useState('');

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      const updated = bookings.filter(b => b.id !== id);
      setBookings(updated);
      localStorage.setItem('mybookings', JSON.stringify(updated));
      setAlert('🗑️ Booking cancelled successfully!');
      setTimeout(() => setAlert(''), 3000);
    }
  };

  return (
    <div className="my-bookings-page">
      <div className="bookings-header">
        <h1>Your <span className="highlight">Entry Passes</span></h1>
        <p>Keep your digital tickets ready for scanning at the venue.</p>
      </div>

      {alert && <div className="booking-alert">{alert}</div>}

      {bookings.length === 0 ? (
        <div className="no-bookings">
          <span>🎟️</span>
          <p>No bookings found.</p>
        </div>
      ) : (
        <div className="tickets-list">
          {bookings.map((ticket) => (
            <div className="mini-ticket" key={ticket.id}>
              <div className="mini-ticket-main">
                <div className="ticket-meta">
                  <span className="ticket-id">#{ticket.id}</span>
                  <button
                    className="cancel-ticket"
                    title="Cancel Booking"
                    onClick={() => handleDelete(ticket.id)}
                  >
                    <Trash2 size={16} /> Cancel
                  </button>
                </div>
                <h3>{ticket.title}</h3>
                <div className="mini-info">
                  <span><MapPin size={14} /> {ticket.location}</span>
                  <span><Calendar size={14} /> {ticket.dateTime}</span>
                </div>
                <div className="mini-footer">
                  <div className="ticket-price">{ticket.price}</div>
                  <div className="seating">
                    <span>Sec: {ticket.section}</span>
                    <span>Row: {ticket.row}</span>
                  </div>
                </div>
              </div>
              <div className="mini-ticket-stub">
                <QRCodeSVG
                  value={`HARMONI-${ticket.id}-${ticket.title}`}
                  size={100}
                  bgColor="#f8fafc"
                  fgColor="#0f172a"
                  level="H"
                  includeMargin={false}
                />
                <span>SCAN AT GATE</span>
                <Barcode value={ticket.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBooking;
