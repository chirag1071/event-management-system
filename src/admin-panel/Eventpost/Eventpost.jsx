import './Eventpost.css';
import { useState, useEffect } from 'react';
import { Upload, Type, Calendar, Clock, DollarSign, MapPin, AlignLeft, Tag, Image as ImageIcon } from 'lucide-react';

function EventPost() {
  const [formData, setFormData] = useState({
    title: "", startDate: "", endDate: "", startTime: "", endTime: "",
    price: "", category: "", location: "", description: "", file: null,
  });
  const [preview, setPreview] = useState(null);
  const [alert, setAlert] = useState('');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('events') || '[]');
    setEvents(saved);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files?.[0]) {
      const file = files[0];
      setFormData({ ...formData, [name]: file });
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.startDate || !formData.location) {
      setAlert('⚠️ Please fill Title, Start Date, and Location!');
      setTimeout(() => setAlert(''), 3000);
      return;
    }

    const newEvent = {
      id: Date.now(),
      name: formData.title,
      location: formData.location,
      date: new Date(formData.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      time: formData.startTime || '00:00',
      price: formData.price || '0',
      category: formData.category || 'General',
      description: formData.description || '',
      image: preview || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
      startDate: formData.startDate,
      endDate: formData.endDate,
      startTime: formData.startTime,
      endTime: formData.endTime,
    };

    const updatedEvents = [...events, newEvent];
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    setEvents(updatedEvents);
    window.dispatchEvent(new Event('storage'));

    setAlert('✅ Event published successfully!');
    setTimeout(() => setAlert(''), 3000);
    setFormData({ title: "", startDate: "", endDate: "", startTime: "", endTime: "", price: "", category: "", location: "", description: "", file: null });
    setPreview(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this event?')) {
      const updated = events.filter(e => e.id !== id);
      localStorage.setItem('events', JSON.stringify(updated));
      setEvents(updated);
      window.dispatchEvent(new Event('storage'));
      setAlert('🗑️ Event deleted!');
      setTimeout(() => setAlert(''), 3000);
    }
  };

  return (
    <div className="admin-page-container">
      <div className="page-header">
        <h1>Create New Event</h1>
        <p>Post a new event to the marketplace.</p>
      </div>

      {alert && (
        <div className={`admin-alert ${alert.startsWith('✅') || alert.startsWith('🗑️') ? 'success' : 'error'}`}>{alert}</div>
      )}

      <div className="event-post-card">
        <form onSubmit={handleSubmit} className="modern-admin-form">
          <div className="form-grid">
            <div className="form-main-content">
              <div className="input-group-modern">
                <label><Type size={16} /> Event Title</label>
                <input type="text" name="title" placeholder="Enter a catchy title..." value={formData.title} onChange={handleChange} required />
              </div>

              <div className="date-time-row">
                <div className="input-group-modern">
                  <label><Calendar size={16} /> Start Date</label>
                  <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
                </div>
                <div className="input-group-modern">
                  <label><Clock size={16} /> Start Time</label>
                  <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} />
                </div>
              </div>

              <div className="date-time-row">
                <div className="input-group-modern">
                  <label><Calendar size={16} /> End Date</label>
                  <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
                </div>
                <div className="input-group-modern">
                  <label><Clock size={16} /> End Time</label>
                  <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} />
                </div>
              </div>

              <div className="input-group-modern">
                <label><DollarSign size={16} /> Ticket Price (₹)</label>
                <input type="number" name="price" placeholder="e.g. 2499" value={formData.price} onChange={handleChange} />
              </div>

              <div className="input-group-modern">
                <label><MapPin size={16} /> Venue Location</label>
                <input type="text" name="location" placeholder="Physical address or online link..." value={formData.location} onChange={handleChange} />
              </div>

              <div className="input-group-modern">
                <label><Tag size={14} /> Category</label>
                <select name="category" value={formData.category} onChange={handleChange}>
                  <option value="">Select Category</option>
                  <option>Wedding</option>
                  <option>Cricket</option>
                  <option>Birthday</option>
                  <option>Festival</option>
                  <option>Office Party</option>
                  <option>Corporate</option>
                  <option>Music</option>
                  <option>DJ Party</option>
                </select>
              </div>
            </div>

            <div className="form-side-content">
              <div className="image-upload-wrapper">
                <label>Event Image</label>
                <div className={`preview-box ${!preview ? 'empty' : ''}`}>
                  {preview ? (
                    <img src={preview} alt="Preview" />
                  ) : (
                    <div className="empty-state">
                      <ImageIcon size={48} />
                      <p>No image selected</p>
                    </div>
                  )}
                </div>
                <input type="file" id="fileUpload" name="file" onChange={handleChange} hidden accept="image/*" />
                <label htmlFor="fileUpload" className="upload-trigger">
                  <Upload size={18} /> Choose Event Poster
                </label>
              </div>

              <div className="input-group-modern mt-24">
                <label><AlignLeft size={16} /> Description</label>
                <textarea name="description" placeholder="Describe the event in detail..." value={formData.description} onChange={handleChange} rows="7"></textarea>
              </div>

              <button type="submit" className="admin-submit-btn">PUBLISH EVENT</button>
            </div>
          </div>
        </form>
      </div>

      {/* Published Events List */}
      {events.length > 0 && (
        <div className="published-events-section">
          <h3 className="section-title">Published Events ({events.length})</h3>
          <div className="published-events-grid">
            {events.map(event => (
              <div className="published-event-card" key={event.id}>
                <div className="pub-event-img">
                  <img src={event.image} alt={event.name} />
                  <span className="pub-event-category">{event.category}</span>
                </div>
                <div className="pub-event-body">
                  <h4>{event.name}</h4>
                  <p className="pub-event-location">📍 {event.location}</p>
                  <p className="pub-event-date">📅 {event.date}</p>
                  <div className="pub-event-footer">
                    <span className="pub-event-price">₹{event.price}</span>
                    <button className="pub-event-delete" onClick={() => handleDelete(event.id)}>🗑️ Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default EventPost;
