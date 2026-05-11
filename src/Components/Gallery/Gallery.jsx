import React, { useState, useEffect } from 'react'
import './Gallery.css'
import { X, Tag, ChevronLeft, ChevronRight } from 'lucide-react'

const defaultItems = [
  { id: 'g1', category: 'WEDDING',   title: 'Royal Beach Wedding',   image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80' },
  { id: 'g2', category: 'WEDDING',   title: 'Garden Luxury Wedding',  image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80' },
  { id: 'g3', category: 'PARTY',     title: 'Holi Color Festival',    image: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&q=80' },
  { id: 'g4', category: 'PARTY',     title: 'Birthday Bash',          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80' },
  { id: 'g5', category: 'CORPORATE', title: 'Annual Corporate Night', image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80' },
  { id: 'g6', category: 'CORPORATE', title: 'Startup Summit 2025',    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80' },
  { id: 'g7', category: 'PARTY',     title: 'DJ Night Fever',         image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=80' },
  { id: 'g8', category: 'WEDDING',   title: 'Destination Wedding',    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80' },
]

const Gallery = () => {
  const [filter, setFilter] = useState('ALL')
  const [adminItems, setAdminItems] = useState([])
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    const load = () => {
      const saved = JSON.parse(localStorage.getItem('gallery') || '[]')
      setAdminItems(saved.map((g, i) => ({ id: `admin-${g.id || i}`, category: 'UPLOADED', title: g.name, image: g.img })))
    }
    load()
    window.addEventListener('storage', load)
    const interval = setInterval(load, 1000)
    return () => { window.removeEventListener('storage', load); clearInterval(interval) }
  }, [])

  const allItems = [...defaultItems, ...adminItems]
  const categories = ['ALL', ...new Set(allItems.map(i => i.category))]
  const filtered = filter === 'ALL' ? allItems : allItems.filter(i => i.category === filter)

  const openLightbox = (item) => setLightbox(item)
  const closeLightbox = () => setLightbox(null)
  const prev = () => {
    const idx = filtered.findIndex(i => i.id === lightbox.id)
    setLightbox(filtered[(idx - 1 + filtered.length) % filtered.length])
  }
  const next = () => {
    const idx = filtered.findIndex(i => i.id === lightbox.id)
    setLightbox(filtered[(idx + 1) % filtered.length])
  }

  return (
    <div className="gallery-page">
      <section className="gallery-intro">
        <span className="subtitle">Our Portfolio</span>
        <h1>Captured <span className="highlight">Moments</span></h1>
        <div className="filter-bar">
          {categories.map(cat => (
            <button key={cat} className={filter === cat ? 'active' : ''} onClick={() => setFilter(cat)}>{cat}</button>
          ))}
        </div>
      </section>

      <div className="gallery-grid">
        {filtered.map(item => (
          <div key={item.id} className="gallery-item modern" onClick={() => openLightbox(item)}>
            <div className="item-img-wrapper">
              <img src={item.image} alt={item.title} />
              <div className="overlay"><span className="zoom-text">View</span></div>
            </div>
            <div className="item-info">
              <div className="item-cat"><Tag size={12} /> {item.category}</div>
              <h3>{item.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lb-close" onClick={closeLightbox}><X size={24} /></button>
          <button className="lb-prev" onClick={e => { e.stopPropagation(); prev(); }}><ChevronLeft size={32} /></button>
          <div className="lb-content" onClick={e => e.stopPropagation()}>
            <img src={lightbox.image} alt={lightbox.title} />
            <div className="lb-info">
              <span className="item-cat"><Tag size={12} /> {lightbox.category}</span>
              <h3>{lightbox.title}</h3>
            </div>
          </div>
          <button className="lb-next" onClick={e => { e.stopPropagation(); next(); }}><ChevronRight size={32} /></button>
        </div>
      )}
    </div>
  )
}

export default Gallery
