import React, { useState } from 'react';
import './Settings.css';
import { Save, Shield, Lock, Eye, EyeOff } from 'lucide-react';

const Security = () => {
  const [config, setConfig] = useState({
    minPasswordLength: 6,
    requireUppercase: true,
    requireNumbers: true,
    requireSpecialChars: false,
    twoFactorAuth: false,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    ipWhitelist: '',
  });
  const [newPass, setNewPass] = useState({ current: '', newp: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [alert, setAlert] = useState({ msg: '', type: '' });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfig(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setAlert({ msg: '✅ Security settings saved!', type: 'success' });
    setTimeout(() => setAlert({ msg: '', type: '' }), 3000);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!newPass.current) { setAlert({ msg: '⚠️ Enter current password!', type: 'error' }); return; }
    if (newPass.newp.length < config.minPasswordLength) { setAlert({ msg: `⚠️ Password must be at least ${config.minPasswordLength} characters!`, type: 'error' }); return; }
    if (newPass.newp !== newPass.confirm) { setAlert({ msg: '⚠️ Passwords do not match!', type: 'error' }); return; }
    setAlert({ msg: '✅ Admin password changed successfully!', type: 'success' });
    setNewPass({ current: '', newp: '', confirm: '' });
    setTimeout(() => setAlert({ msg: '', type: '' }), 3000);
  };

  return (
    <div className="admin-page-container">
      <div className="page-header">
        <h1>Security Settings</h1>
        <p>Configure authentication and security policies.</p>
      </div>

      {alert.msg && <div className={`admin-alert ${alert.type}`}>{alert.msg}</div>}

      <div className="settings-grid two-col">
        {/* Password Policy */}
        <form onSubmit={handleSave}>
          <div className="settings-card">
            <h3 className="settings-section-title"><Shield size={18} /> Password Policy</h3>
            <div className="settings-fields">
              <div className="settings-row">
                <div className="settings-field">
                  <label>Min Password Length</label>
                  <input type="number" name="minPasswordLength" value={config.minPasswordLength} onChange={handleChange} min={4} max={20} />
                </div>
                <div className="settings-field">
                  <label>Max Login Attempts</label>
                  <input type="number" name="maxLoginAttempts" value={config.maxLoginAttempts} onChange={handleChange} min={1} max={10} />
                </div>
              </div>
              <div className="settings-field">
                <label>Session Timeout (minutes)</label>
                <input type="number" name="sessionTimeout" value={config.sessionTimeout} onChange={handleChange} min={5} />
              </div>
            </div>

            <div className="toggle-list mt-16">
              {[
                { key: 'requireUppercase', label: 'Require Uppercase', desc: 'Password must contain uppercase letters.' },
                { key: 'requireNumbers', label: 'Require Numbers', desc: 'Password must contain at least one number.' },
                { key: 'requireSpecialChars', label: 'Require Special Chars', desc: 'Password must contain special characters.' },
                { key: 'twoFactorAuth', label: 'Two-Factor Authentication', desc: 'Enable 2FA for admin login.' },
              ].map(({ key, label, desc }) => (
                <div className="toggle-item" key={key}>
                  <div>
                    <p className="toggle-label">{label}</p>
                    <p className="toggle-desc">{desc}</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" name={key} checked={config[key]} onChange={handleChange} />
                    <span className="slider" />
                  </label>
                </div>
              ))}
            </div>

            <button type="submit" className="settings-save-btn mt-20">
              <Save size={18} /> Save Security Settings
            </button>
          </div>
        </form>

        {/* Change Admin Password */}
        <form onSubmit={handlePasswordChange}>
          <div className="settings-card">
            <h3 className="settings-section-title"><Lock size={18} /> Change Admin Password</h3>
            <div className="settings-fields">
              {[
                { key: 'current', label: 'Current Password' },
                { key: 'newp', label: 'New Password' },
                { key: 'confirm', label: 'Confirm New Password' },
              ].map(({ key, label }) => (
                <div className="settings-field" key={key}>
                  <label>{label}</label>
                  <div className="pass-input-wrap">
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={newPass[key]}
                      onChange={e => setNewPass(prev => ({ ...prev, [key]: e.target.value }))}
                      placeholder="••••••••"
                    />
                    <button type="button" className="pass-toggle" onClick={() => setShowPass(!showPass)}>
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button type="submit" className="settings-save-btn mt-20">
              <Lock size={18} /> Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Security;
