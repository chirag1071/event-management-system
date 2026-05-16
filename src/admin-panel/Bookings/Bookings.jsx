import React, { useState, useEffect } from 'react';
import './Bookings.css';
import { Ticket, Search, Trash2, Calendar, User, CreditCard } from 'lucide-react';

const initialBookings = [
  {
    id: "IPL-2025-001",
    title: "INDIAN PREMIER LEAGUE",
    location: "Motera Stadium, Ahmedabad",
    dateTime: "March 15, 2025 | 19:32 IST",
    price: "₹2,499.00",
    section: "VIP EAST",
    row: "GA",
    payMethod: "UPI",
    userName: "Chirag Bavaliya",
    userEmail: "chirag@harmoni.com",
    qty: 2
  },
  {
    id: "GPL-2024-042",
    title: "GOKULDHAM PREMIER LEAGUE",
    location: "GokulDham Society, Mumbai",
    dateTime: "October 30, 2024 | 09:00 IST",
    price: "₹200.00",
    section: "GENERAL",
    row: "B-12",
    payMethod: "Cash",
    userName: "Jethalal Gada",
    userEmail: "jethalal@gelectronics.com",
    qty: 4
  }
];

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [alert, setAlert] = useState('');

  useEffect(() => {
    const loadBookings = () => {
      const saved = JSON.parse(localStorage.getItem('mybookings') || '[]');
      const displayBookings = saved.length > 0 ? saved : initialBookings;
      // Reverse to show newest first
      setBookings([...displayBookings].reverse());
    };
    loadBookings();
    window.addEventListener('storage', loadBookings);
    return () => window.removeEventListener('storage', loadBookings);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this booking record?')) {
      const updated = bookings.filter(b => b.id !== id);
      localStorage.setItem('mybookings', JSON.stringify([...updated].reverse())); // reverse back for storage
      setBookings(updated);
      setAlert('🗑️ Booking deleted successfully!');
      setTimeout(() => setAlert(''), 3000);
    }
  };

  const filteredBookings = bookings.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (b.userName && b.userName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="admin-page-container">
      <div className="page-header">
        <h1>Ticket Bookings</h1>
        <p>View and manage all user ticket bookings.</p>
      </div>

      {alert && <div className="admin-alert success">{alert}</div>}

      <div className="admin-card">
        <div className="admin-card-header">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by Event, User, or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="total-bookings-badge">
            <Ticket size={16} />
            Total Bookings: {bookings.length}
          </div>
        </div>

        <div className="table-responsive">
          <table className="modern-admin-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>User Details</th>
                <th>Event Info</th>
                <th>Ticket Details</th>
                <th>Payment</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="empty-row">No bookings found.</td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>
                      <span className="booking-id-tag">#{booking.id}</span>
                    </td>
                    <td>
                      <div className="user-details-col">
                        <span className="user-name"><User size={14} /> {booking.userName || 'Guest User'}</span>
                        <span className="user-email">{booking.userEmail || 'N/A'}</span>
                      </div>
                    </td>
                    <td>
                      <div className="event-info-col">
                        <strong className="event-title">{booking.title}</strong>
                        <span className="event-date"><Calendar size={12} /> {booking.dateTime}</span>
                      </div>
                    </td>
                    <td>
                      <div className="ticket-details-col">
                        <span className="ticket-qty">{booking.qty || 1}x Tickets</span>
                        <span className="ticket-section">{booking.section} Section</span>
                      </div>
                    </td>
                    <td>
                      <div className="payment-col">
                        <strong className="payment-amount">{booking.price}</strong>
                        <span className="payment-method"><CreditCard size={12} /> {booking.payMethod}</span>
                      </div>
                    </td>
                    <td className="text-right">
                      <button className="icon-btn danger" onClick={() => handleDelete(booking.id)} title="Delete Booking">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
