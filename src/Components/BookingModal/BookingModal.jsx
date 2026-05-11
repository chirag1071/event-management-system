import React, { useState } from 'react';
import './BookingModal.css';
import { X, Ticket, CreditCard, Banknote, Smartphone, CheckCircle } from 'lucide-react';

const BookingModal = ({ event, onClose }) => {
  const [step, setStep] = useState(1); // 1=seats, 2=payment, 3=success
  const [qty, setQty] = useState(1);
  const [section, setSection] = useState('General');
  const [payMethod, setPayMethod] = useState('');
  const [upiId, setUpiId] = useState('');
  const [alert, setAlert] = useState('');

  const sections = [
    { name: 'General',  price: Number(event.price) },
    { name: 'VIP',      price: Number(event.price) * 2 },
    { name: 'Premium',  price: Number(event.price) * 3 },
  ];

  const selectedSection = sections.find(s => s.name === section);
  const total = selectedSection.price * qty;

  const handlePayment = () => {
    if (!payMethod) { setAlert('⚠️ Please select a payment method!'); return; }
    if (payMethod === 'UPI' && !upiId.trim()) { setAlert('⚠️ Please enter your UPI ID!'); return; }

    // Save to mybooking
    const booking = {
      id: `${event.name.slice(0,3).toUpperCase()}-${Date.now()}`,
      title: event.name,
      location: event.location,
      dateTime: `${event.date} | ${event.time} IST`,
      price: `₹${total.toLocaleString()}`,
      section: section.toUpperCase(),
      row: 'GA',
      payMethod,
    };
    const existing = JSON.parse(localStorage.getItem('mybookings') || '[]');
    localStorage.setItem('mybookings', JSON.stringify([...existing, booking]));
    setStep(3);
  };

  return (
    <div className="bm-overlay" onClick={onClose}>
      <div className="bm-modal" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="bm-header">
          <div>
            <h3>{event.name}</h3>
            <p>{event.location} • {event.date}</p>
          </div>
          <button className="bm-close" onClick={onClose}><X size={20} /></button>
        </div>

        {/* Step Indicator */}
        {step < 3 && (
          <div className="bm-steps">
            <div className={`bm-step ${step >= 1 ? 'active' : ''}`}><span>1</span> Seats</div>
            <div className="bm-step-line" />
            <div className={`bm-step ${step >= 2 ? 'active' : ''}`}><span>2</span> Payment</div>
          </div>
        )}

        {/* Step 1 — Seat Selection */}
        {step === 1 && (
          <div className="bm-body">
            <div className="bm-event-img">
              <img src={event.image} alt={event.name} />
              <span className="bm-price-badge">₹{Number(event.price).toLocaleString()}</span>
            </div>

            <div className="bm-field">
              <label>Select Section</label>
              <div className="bm-section-grid">
                {sections.map(s => (
                  <div
                    key={s.name}
                    className={`bm-section-card ${section === s.name ? 'active' : ''}`}
                    onClick={() => setSection(s.name)}
                  >
                    <span className="bm-section-name">{s.name}</span>
                    <span className="bm-section-price">₹{s.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bm-field">
              <label>Number of Tickets</label>
              <div className="bm-qty-row">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => Math.min(10, q + 1))}>+</button>
              </div>
            </div>

            <div className="bm-total-row">
              <span>Total Amount</span>
              <strong>₹{total.toLocaleString()}</strong>
            </div>

            <button className="bm-next-btn" onClick={() => setStep(2)}>
              Continue to Payment →
            </button>
          </div>
        )}

        {/* Step 2 — Payment */}
        {step === 2 && (
          <div className="bm-body">
            <div className="bm-summary">
              <p><strong>{event.name}</strong></p>
              <p>{qty} × {section} — <strong>₹{total.toLocaleString()}</strong></p>
            </div>

            {alert && <div className="bm-alert">{alert}</div>}

            <div className="bm-field">
              <label>Select Payment Method</label>
              <div className="bm-pay-grid">
                <div
                  className={`bm-pay-card ${payMethod === 'UPI' ? 'active' : ''}`}
                  onClick={() => { setPayMethod('UPI'); setAlert(''); }}
                >
                  <Smartphone size={28} />
                  <span>UPI</span>
                </div>
                <div
                  className={`bm-pay-card ${payMethod === 'Cash' ? 'active' : ''}`}
                  onClick={() => { setPayMethod('Cash'); setAlert(''); }}
                >
                  <Banknote size={28} />
                  <span>Cash</span>
                </div>
                <div
                  className={`bm-pay-card ${payMethod === 'Bank' ? 'active' : ''}`}
                  onClick={() => { setPayMethod('Bank'); setAlert(''); }}
                >
                  <CreditCard size={28} />
                  <span>Bank</span>
                </div>
              </div>
            </div>

            {payMethod === 'UPI' && (
              <div className="bm-field">
                <label>Enter UPI ID</label>
                <input
                  type="text"
                  placeholder="e.g. name@upi"
                  value={upiId}
                  onChange={e => { setUpiId(e.target.value); setAlert(''); }}
                  className="bm-input"
                />
              </div>
            )}

            {payMethod === 'Bank' && (
              <div className="bm-field">
                <label>Bank Transfer Details</label>
                <div className="bm-bank-info">
                  <p>Account Name: <strong>Harmoni Events Pvt Ltd</strong></p>
                  <p>Account No: <strong>1234 5678 9012</strong></p>
                  <p>IFSC: <strong>HDFC0001234</strong></p>
                  <p>Bank: <strong>HDFC Bank</strong></p>
                </div>
              </div>
            )}

            {payMethod === 'Cash' && (
              <div className="bm-field">
                <div className="bm-cash-info">
                  💵 Pay cash at the venue counter on the event day. Show this booking confirmation.
                </div>
              </div>
            )}

            <div className="bm-btn-row">
              <button className="bm-back-btn" onClick={() => { setStep(1); setAlert(''); }}>← Back</button>
              <button className="bm-pay-btn" onClick={handlePayment}>
                Pay ₹{total.toLocaleString()} <Ticket size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3 — Success */}
        {step === 3 && (
          <div className="bm-success">
            <CheckCircle size={64} className="bm-success-icon" />
            <h3>Booking Confirmed!</h3>
            <p>Your ticket for <strong>{event.name}</strong> has been booked.</p>
            <div className="bm-success-details">
              <p>📍 {event.location}</p>
              <p>📅 {event.date}</p>
              <p>🎫 {qty} × {section}</p>
              <p>💰 ₹{total.toLocaleString()} via {payMethod}</p>
            </div>
            <button className="bm-done-btn" onClick={onClose}>View My Bookings →</button>
          </div>
        )}

      </div>
    </div>
  );
};

export default BookingModal;
