import React, { useState } from 'react';
import { Search, Bell, Settings, User, LogOut, Shield, Camera, X, Save, Lock, Mail, UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import './admin-Header.css';

const AdminHeader = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Chirag Bavaliya',
    email: 'admin@harmoni.com',
    role: 'Super Admin',
    photo: 'https://i.pravatar.cc/150?u=chirag',
    newPassword: '',
    confirmPassword: '',
  });
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [alert, setAlert] = useState({ msg: '', type: '' });

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setPreviewPhoto(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (profile.newPassword && profile.newPassword !== profile.confirmPassword) {
      setAlert({ msg: '⚠️ Passwords do not match!', type: 'error' });
      return;
    }
    if (previewPhoto) setProfile(p => ({ ...p, photo: previewPhoto }));
    setAlert({ msg: '✅ Profile updated successfully!', type: 'success' });
    setTimeout(() => { setAlert({ msg: '', type: '' }); setShowEditProfile(false); }, 1500);
  };

  const currentPhoto = previewPhoto || profile.photo;

  return (
    <>
      <header className="admin-header">
        <div className="header-left">
          <h2 className="header-title">Dashboard Overview</h2>
        </div>

        <div className="header-center">
          <div className="search-wrapper">
            <Search className="search-icon" size={18} />
            <input type="text" placeholder="Search for anything..." />
          </div>
        </div>

        <div className="header-right">
          {/* Notifications */}
          <div className="admin-nav-item">
            <button className={`icon-btn ${activeDropdown === 'notif' ? 'active' : ''}`} onClick={() => toggleDropdown('notif')}>
              <Bell size={20} />
              <span className="badge"></span>
            </button>
            {activeDropdown === 'notif' && (
              <div className="admin-dropdown">
                <div className="dropdown-head">Notifications</div>
                <div className="dropdown-body">
                  <div className="notif-item">🎉 New event posted by Spark User</div>
                  <div className="notif-item">⚠️ User report: "Unable to book cricket"</div>
                  <div className="notif-item">✅ System update complete</div>
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <div className="admin-nav-item">
            <button className={`icon-btn ${activeDropdown === 'settings' ? 'active' : ''}`} onClick={() => toggleDropdown('settings')}>
              <Settings size={20} />
            </button>
            {activeDropdown === 'settings' && (
              <div className="admin-dropdown">
                <div className="dropdown-head">Settings</div>
                <div className="dropdown-body">
                  <Link to="/admin/settings/system"><Settings size={14} /> System Config</Link>
                  <Link to="/admin/settings/security"><Shield size={14} /> Security</Link>
                  <Link to="/admin/settings/roles"><User size={14} /> Roles</Link>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="admin-nav-item" onClick={() => toggleDropdown('profile')}>
            <div className={`admin-profile ${activeDropdown === 'profile' ? 'active' : ''}`}>
              <div className="profile-info">
                <span className="admin-name">{profile.name}</span>
                <span className="admin-role">{profile.role}</span>
              </div>
              <img src={currentPhoto} alt="Admin" className="profile-pic" />
            </div>
            {activeDropdown === 'profile' && (
              <div className="admin-dropdown profile-drop">
                <div className="profile-drop-header">
                  <img src={currentPhoto} alt="Admin" className="drop-avatar" />
                  <div>
                    <p className="drop-name">{profile.name}</p>
                    <p className="drop-email">{profile.email}</p>
                  </div>
                </div>
                <hr />
                <div className="dropdown-body">
                  <button className="drop-btn" onClick={(e) => { e.stopPropagation(); setShowEditProfile(true); setActiveDropdown(null); }}>
                    <User size={14} /> Edit Profile
                  </button>
                  <hr />
                  <a href="/login" className="logout-link"><LogOut size={14} /> Logout</a>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="ep-overlay" onClick={() => setShowEditProfile(false)}>
          <div className="ep-modal" onClick={e => e.stopPropagation()}>

            <div className="ep-header">
              <h3>Edit Profile</h3>
              <button className="ep-close" onClick={() => setShowEditProfile(false)}><X size={20} /></button>
            </div>

            <form onSubmit={handleSave}>
              <div className="ep-body">

                {/* Photo Upload */}
                <div className="ep-photo-section">
                  <div className="ep-avatar-wrap">
                    <img src={currentPhoto} alt="Profile" className="ep-avatar" />
                    <label htmlFor="adminPhoto" className="ep-camera-btn">
                      <Camera size={16} />
                    </label>
                    <input type="file" id="adminPhoto" accept="image/*" onChange={handlePhotoChange} hidden />
                  </div>
                  <div>
                    <p className="ep-name">{profile.name}</p>
                    <p className="ep-role-tag">{profile.role}</p>
                  </div>
                </div>

                {alert.msg && (
                  <div className={`ep-alert ${alert.type}`}>{alert.msg}</div>
                )}

                {/* Fields */}
                <div className="ep-field">
                  <label><UserCircle size={15} /> Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                    placeholder="Full Name"
                  />
                </div>

                <div className="ep-field">
                  <label><Mail size={15} /> Email Address</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
                    placeholder="Email"
                  />
                </div>

                <div className="ep-divider">Change Password <span>(optional)</span></div>

                <div className="ep-row">
                  <div className="ep-field">
                    <label><Lock size={15} /> New Password</label>
                    <input
                      type="password"
                      value={profile.newPassword}
                      onChange={e => setProfile(p => ({ ...p, newPassword: e.target.value }))}
                      placeholder="New password"
                    />
                  </div>
                  <div className="ep-field">
                    <label><Lock size={15} /> Confirm Password</label>
                    <input
                      type="password"
                      value={profile.confirmPassword}
                      onChange={e => setProfile(p => ({ ...p, confirmPassword: e.target.value }))}
                      placeholder="Confirm password"
                    />
                  </div>
                </div>
              </div>

              <div className="ep-footer">
                <button type="button" className="ep-cancel-btn" onClick={() => setShowEditProfile(false)}>Cancel</button>
                <button type="submit" className="ep-save-btn"><Save size={16} /> Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminHeader;
