import './PostCategory.css';
import { useState, useEffect } from 'react';
import { Trash2, Plus, Type, Image as ImageIcon, Upload, Edit2, Check, X } from 'lucide-react';

const initialCategories = [
  { id: 1, name: "Wedding",  img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=300&q=80" },
  { id: 2, name: "Cricket",  img: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=300&q=80" },
  { id: 3, name: "Birthday", img: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=300&q=80" },
  { id: 4, name: "Navratri", img: "https://images.unsplash.com/photo-1561081604-5f5c1a84f475?auto=format&fit=crop&w=300&q=80" },
  { id: 5, name: "Corporate",img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=300&q=80" },
];

const STORAGE_KEY = 'adminCategories';

function PostCategory() {
  const [categories, setCategories] = useState(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    return saved || initialCategories;
  });
  const [title, setTitle] = useState('');
  const [preview, setPreview] = useState(null);
  const [alert, setAlert] = useState('');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');

  // Save to localStorage whenever categories change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  }, [categories]);

  const showAlert = (msg) => { setAlert(msg); setTimeout(() => setAlert(''), 3000); };

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(f);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) { showAlert('⚠️ Please enter a category name.'); return; }
    const newCat = {
      id: Date.now(),
      name: title.trim(),
      img: preview || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=300&q=80'
    };
    setCategories(prev => [...prev, newCat]);
    setTitle(''); setPreview(null);
    showAlert('✅ Category added successfully!');
  };

  const handleDelete = (id) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    showAlert('🗑️ Category deleted!');
  };

  const startEdit = (cat) => { setEditId(cat.id); setEditName(cat.name); };

  const saveEdit = (id) => {
    if (!editName.trim()) return;
    setCategories(prev => prev.map(c => c.id === id ? { ...c, name: editName.trim() } : c));
    setEditId(null);
    showAlert('✅ Category updated!');
  };

  return (
    <div className="admin-page-container">
      <div className="page-header">
        <h1>Event Categories</h1>
        <p>Manage and organize event types.</p>
      </div>

      {alert && (
        <div className={`admin-alert ${alert.startsWith('✅') ? 'success' : alert.startsWith('🗑️') ? 'success' : 'error'}`}>{alert}</div>
      )}

      <div className="category-layout">
        {/* Form Panel */}
        <div className="category-form-card">
          <div className="card-header">
            <h3><Plus size={18} /> Add New Category</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="image-upload-small">
              <div className={`mini-preview ${!preview ? 'empty' : ''}`}>
                {preview ? <img src={preview} alt="Preview" /> : <ImageIcon size={28} />}
              </div>
              <input type="file" id="catFile" onChange={handleFile} hidden accept="image/*" />
              <label htmlFor="catFile" className="mini-upload-btn">
                <Upload size={14} /> Choose Image
              </label>
            </div>

            <div className="input-group-modern mt-24">
              <label><Type size={14} /> Category Name</label>
              <input
                type="text"
                placeholder="e.g. Corporate, Music..."
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="admin-submit-btn">CREATE CATEGORY</button>
          </form>
        </div>

        {/* List Panel */}
        <div className="category-list-card">
          <table className="modern-admin-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Preview</th>
                <th>Category Name</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr><td colSpan={4} className="empty-row">No categories yet.</td></tr>
              ) : (
                categories.map((cat, index) => (
                  <tr key={cat.id}>
                    <td className="seq-num">{index + 1}</td>
                    <td>
                      <img src={cat.img} alt={cat.name} className="table-img-round" />
                    </td>
                    <td>
                      {editId === cat.id ? (
                        <input
                          className="edit-inline-input"
                          value={editName}
                          onChange={e => setEditName(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && saveEdit(cat.id)}
                          autoFocus
                        />
                      ) : (
                        <strong>{cat.name}</strong>
                      )}
                    </td>
                    <td className="text-right">
                      <div className="action-btns-row">
                        {editId === cat.id ? (
                          <>
                            <button className="icon-btn success" onClick={() => saveEdit(cat.id)}><Check size={16} /></button>
                            <button className="icon-btn neutral" onClick={() => setEditId(null)}><X size={16} /></button>
                          </>
                        ) : (
                          <button className="icon-btn edit" onClick={() => startEdit(cat)}><Edit2 size={16} /></button>
                        )}
                        <button className="icon-btn danger" onClick={() => handleDelete(cat.id)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
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
}

export default PostCategory;
