import React, { useState } from 'react'
import './Cricket.css'
import { Calendar, MapPin, Clock, Ticket as TicketIcon } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import BookingModal from '../BookingModal/BookingModal'

const cricketEvent = {
  id: 'IPL-2025-001',
  name: 'INDIAN PREMIER LEAGUE',
  location: 'Motera Stadium, Ahmedabad',
  date: 'March 15, 2025',
  time: '19:32',
  price: '2499',
  category: 'Cricket',
  image: 'https://images.unsplash.com/photo-1540747913346-19212a4b423e?w=800&q=80',
}

const Cricket = () => {
  const [showBooking, setShowBooking] = useState(false)

  return (
    <div className="ticket-page">
      <div className="ticket-container">
        <div className="ticket-main">
          <div className="ticket-header">
            <div className="event-badge">Match Day</div>
            <img src={cricketEvent.image} alt="IPL" className="ticket-img" />
          </div>

          <div className="ticket-body">
            <h1 className="ticket-title">INDIAN PREMIER LEAGUE</h1>
            <div className="ticket-info-grid">
              <div className="info-item">
                <Calendar size={18} />
                <div><label>Date</label><p>March 15 - May 09, 2025</p></div>
              </div>
              <div className="info-item">
                <Clock size={18} />
                <div><label>Time</label><p>19:32 IST</p></div>
              </div>
              <div className="info-item full">
                <MapPin size={18} />
                <div><label>Venue</label><p>Motera Stadium, Ahmedabad</p></div>
              </div>
            </div>
          </div>

          <div className="ticket-footer">
            <div className="price-tag">
              <span>Ticket Price</span>
              <strong>₹2,499.00</strong>
            </div>
            <button className="book-btn-ticket" onClick={() => setShowBooking(true)}>
              BOOK NOW <TicketIcon size={18} />
            </button>
          </div>
        </div>

        <div className="ticket-divider">
          <div className="hollow-circle top"></div>
          <div className="dashed-line"></div>
          <div className="hollow-circle bottom"></div>
        </div>

        <div className="ticket-stub">
          <div className="stub-header">
            <h3>ENTRY PASS</h3>
            <span className="serial">#IPL-2025-001</span>
          </div>
          <div className="qr-box">
            <QRCodeSVG
              value="HARMONI-IPL-2025-001-INDIAN PREMIER LEAGUE"
              size={100}
              bgColor="#f8fafc"
              fgColor="#0f172a"
              level="H"
            />
            <p className="qr-label">Scan at Gate 4</p>
          </div>
          <div className="stub-info">
            <p><strong>Section:</strong> VIP EAST</p>
            <p><strong>Row:</strong> GA</p>
          </div>
          <div className="barcode"></div>
        </div>
      </div>

      {showBooking && (
        <BookingModal event={cricketEvent} onClose={() => setShowBooking(false)} />
      )}
    </div>
  )
}

export default Cricket
