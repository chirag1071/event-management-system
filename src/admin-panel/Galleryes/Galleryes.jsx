import React, { useState } from 'react';
import { Image as ImageIcon, Upload, Type, Trash2, CheckCircle } from 'lucide-react';
import "./Galleryes.css";

const initialGallery = [
  { id: 1, name: "Luxury Wedding 2024", img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80" },
  { id: 2, name: "Cricket Final",       img: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=400&q=80" },
  { id: 3, name: "Birthday Bash",       img: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=400&q=80" },
  { id: 4, name: "Corporate Gala",      img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=400&q=80" },
];

const AddGallery = () => {
  const [galleryName, setGalleryName] = useState('');
  const [preview, setPreview] = useState(null);
  const [galleryList, setGalleryList] = useState(initialGallery);
  const [alert, setAlert] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!galleryName.trim()) { setAlert('⚠️ Please enter a gallery label.'); setTimeout(() => setAlert(''), 3000); return; }
    if (!preview) { setAlert('⚠️ Please choose an image.'); setTimeout(() => setAlert(''), 3000); return; }

    setGalleryList(prev => [{ id: Date.now(), name: galleryName.trim(), img: preview }, ...prev]);
    // Save to localStorage so frontend Gallery page shows it
    const updated = [{ id: Date.now(), name: galleryName.trim(), img: preview }, ...galleryList];
    localStorage.setItem('gallery', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
    setGalleryName(''); setPreview(null);
    setAlert('✅ Image published to gallery!');
    setTimeout(() => setAlert(''), 3000);
  };

  const handleDelete = (id) => {
    if (window.confirm('Remove this image from gallery?')) {
      const updated = galleryList.filter(g => g.id !== id);
      setGalleryList(updated);
      localStorage.setItem('gallery', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
    }
  };

  return (
    <div className="admin-page-container">
      <div className="page-header">
        <h1>Gallery Management</h1>
        <p>Upload and manage your event showcase images.</p>
      </div>

      {alert && (
        <div className={`admin-alert ${alert.startsWith('✅') ? 'success' : 'error'}`}>{alert}</div>
      )}

      <div className="gallery-layout">
        {/* Upload Form */}
        <div className="gallery-form-card">
          <h3 className="form-title">Upload New Image</h3>
          <form onSubmit={handleSubmit}>
            <div className={`large-preview ${!preview ? 'empty' : ''}`}>
              {preview ? (
                <img src={preview} alt="Preview" />
              ) : (
                <div className="empty-state">
                  <ImageIcon size={48} />
                  <p>No image selected</p>
                </div>
              )}
            </div>

            <input type="file" id="galleryFile" onChange={handleFileChange} hidden accept="image/*" />
            <label htmlFor="galleryFile" className="upload-btn-full">
              <Upload size={18} /> Choose Image
            </label>

            <div className="input-group-modern mt-20">
              <label><Type size={14} /> Gallery Label</label>
              <input
                type="text"
                placeholder="e.g. Grand Wedding 2024..."
                value={galleryName}
                onChange={e => setGalleryName(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="admin-submit-btn">
              <CheckCircle size={18} /> PUBLISH TO GALLERY
            </button>
          </form>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid-section">
          <h3 className="form-title">Current Gallery ({galleryList.length} images)</h3>
          <div className="gallery-grid">
            {galleryList.map((item, index) => (
              <div className="gallery-card" key={item.id}>
                <div className="gallery-img-wrap">
                  <img src={item.img} alt={item.name} />
                  <div className="gallery-overlay">
                    <span className="gallery-num">#{index + 1}</span>
                    <button className="gallery-delete-btn" onClick={() => handleDelete(item.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="gallery-card-footer">
                  <span>{item.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGallery;
