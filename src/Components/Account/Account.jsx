import React, { useState, useEffect } from 'react';
import './Account.css';
import { useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';

const fields = [
  { key: 'fullname', icon: '👤', label: 'Full Name' },
  { key: 'email',    icon: '📧', label: 'Email' },
  { key: 'gender',   icon: '⚧',  label: 'Gender' },
  { key: 'phone',    icon: '📞', label: 'Phone' },
];

const Account = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(null);
  const [editVal, setEditVal] = useState('');
  const [alert, setAlert] = useState({ msg: '', type: '' });

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('loggedUser'));
    if (!u) { navigate('/login'); return; }
    setUser(u);
  }, []);

  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert({ msg: '', type: '' }), 3000);
  };

  const startEdit = (key) => {
    setEditing(key);
    setEditVal(user[key] || '');
  };

  const saveEdit = (key) => {
    if (!editVal.trim()) { showAlert('⚠️ Field cannot be empty!', 'error'); return; }

    const updatedUser = { ...user, [key]: editVal.trim() };

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const idx = users.findIndex(u => u.phone === user.phone);
    if (idx !== -1) { users[idx] = updatedUser; localStorage.setItem('users', JSON.stringify(users)); }

    localStorage.setItem('loggedUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setEditing(null);
    showAlert('✅ Updated successfully!', 'success');
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedUser = { ...user, photo: reader.result };
      
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const idx = users.findIndex(u => u.phone === user.phone);
      if (idx !== -1) { users[idx] = updatedUser; localStorage.setItem('users', JSON.stringify(users)); }

      localStorage.setItem('loggedUser', JSON.stringify(updatedUser));
      setUser(updatedUser);
      showAlert('✅ Profile photo updated!', 'success');
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="account-page">
      <div className="account-card">
        <div className="account-header">
          <span className="account-header-icon">🔥</span>
          <h2>Account Details</h2>
        </div>

        {alert.msg && <div className={`alert-box ${alert.type}`}>{alert.msg}</div>}

        <div className="profile-section">
          <div className="avatar-wrapper">
            {user.photo ? (
              <img src={user.photo} alt="Profile" className="avatar-photo" />
            ) : (
              <div className="avatar">{user.fullname?.charAt(0).toUpperCase()}</div>
            )}
            <label htmlFor="photoUpload" className="camera-btn">
              <Camera size={16} />
            </label>
            <input
              type="file"
              id="photoUpload"
              accept="image/*"
              onChange={handlePhotoUpload}
              hidden
            />
          </div>
          <p className="profile-name">{user.fullname}</p>
        </div>

        <div className="fields-list">
          {fields.map(({ key, icon, label }) => (
            <div className="field-item" key={key}>
              <div className="field-left">
                <span className="field-icon">{icon}</span>
                {editing === key ? (
                  <input
                    className="field-input"
                    value={editVal}
                    onChange={e => setEditVal(e.target.value)}
                    autoFocus
                    onKeyDown={e => e.key === 'Enter' && saveEdit(key)}
                  />
                ) : (
                  <span className="field-value">{user[key] || '—'}</span>
                )}
              </div>
              <div className="field-actions">
                {editing === key ? (
                  <>
                    <button className="btn-save" onClick={() => saveEdit(key)}>💾 Save</button>
                    <button className="btn-cancel" onClick={() => setEditing(null)}>✕</button>
                  </>
                ) : (
                  <button className="btn-edit" onClick={() => startEdit(key)}>✏️ Edit</button>
                )}
              </div>
            </div>
          ))}
        </div>

        <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
      </div>
    </div>
  );
};

export default Account;
