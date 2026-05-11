import React, { useState } from 'react';
import './Settings.css';
import { Save, Globe, Mail, Phone, MapPin } from 'lucide-react';

const SystemConfig = () => {
  const [config, setConfig] = useState({
    siteName: 'Harmoni Events',
    siteEmail: 'admin@harmoni.com',
    sitePhone: '+91 98765 43210',
    siteAddress: 'Ahmedabad, Gujarat, India',
    currency: 'INR',
    timezone: 'Asia/Kolkata',
    maintenanceMode: false,
    allowRegistration: true,
  });
  const [alert, setAlert] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfig(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setAlert('✅ System configuration saved successfully!');
    setTimeout(() => setAlert(''), 3000);
  };

  return (
    <div className="admin-page-container">
      <div className="page-header">
        <h1>System Configuration</h1>
        <p>Manage global system settings and preferences.</p>
      </div>

      {alert && <div className="admin-alert success">{alert}</div>}

      <div className="settings-grid">
        <form onSubmit={handleSave}>
          <div className="settings-card">
            <h3 className="settings-section-title"><Globe size={18} /> Site Information</h3>
            <div className="settings-fields">
              {[
                { key: 'siteName', label: 'Site Name', icon: <Globe size={14} />, type: 'text' },
                { key: 'siteEmail', label: 'Admin Email', icon: <Mail size={14} />, type: 'email' },
                { key: 'sitePhone', label: 'Contact Phone', icon: <Phone size={14} />, type: 'text' },
                { key: 'siteAddress', label: 'Address', icon: <MapPin size={14} />, type: 'text' },
              ].map(({ key, label, icon, type }) => (
                <div className="settings-field" key={key}>
                  <label>{icon} {label}</label>
                  <input type={type} name={key} value={config[key]} onChange={handleChange} />
                </div>
              ))}

              <div className="settings-row">
                <div className="settings-field">
                  <label>Currency</label>
                  <select name="currency" value={config.currency} onChange={handleChange}>
                    <option value="INR">INR (₹)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                  </select>
                </div>
                <div className="settings-field">
                  <label>Timezone</label>
                  <select name="timezone" value={config.timezone} onChange={handleChange}>
                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">America/New_York</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="settings-card mt-20">
            <h3 className="settings-section-title">⚙️ System Toggles</h3>
            <div className="toggle-list">
              <div className="toggle-item">
                <div>
                  <p className="toggle-label">Maintenance Mode</p>
                  <p className="toggle-desc">Temporarily disable the site for users.</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" name="maintenanceMode" checked={config.maintenanceMode} onChange={handleChange} />
                  <span className="slider" />
                </label>
              </div>
              <div className="toggle-item">
                <div>
                  <p className="toggle-label">Allow Registration</p>
                  <p className="toggle-desc">Allow new users to register on the platform.</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" name="allowRegistration" checked={config.allowRegistration} onChange={handleChange} />
                  <span className="slider" />
                </label>
              </div>
            </div>
          </div>

          <button type="submit" className="settings-save-btn">
            <Save size={18} /> Save Configuration
          </button>
        </form>
      </div>
    </div>
  );
};

export default SystemConfig;
