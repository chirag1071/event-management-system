import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullname: '', email: '', gender: '', phone: '', password: '' });
  const [alert, setAlert] = useState({ msg: '', type: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullname, email, gender, phone, password } = form;

    if (!fullname || !email || !gender || !phone || !password) {
      setAlert({ msg: '⚠️ Please fill all required fields!', type: 'error' });
      return;
    }
    if (phone.length < 10) {
      setAlert({ msg: '⚠️ Enter a valid 10-digit phone number!', type: 'error' });
      return;
    }
    if (password.length < 6) {
      setAlert({ msg: '⚠️ Password must be at least 6 characters!', type: 'error' });
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.phone === phone)) {
      setAlert({ msg: '❌ Phone number already registered!', type: 'error' });
      return;
    }

    users.push(form);
    localStorage.setItem('users', JSON.stringify(users));
    setAlert({ msg: '✅ Registration successful! Redirecting to login...', type: 'success' });
    setTimeout(() => navigate('/login'), 1500);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-icon">📝</div>
        <h2>Create Account</h2>

        {alert.msg && (
          <div className={`alert-box ${alert.type}`}>{alert.msg}</div>
        )}

        <form onSubmit={handleSubmit}>
          <input type="text" name="fullname" placeholder="Full Name *" value={form.fullname} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email *" value={form.email} onChange={handleChange} />

          <div className="gender-group">
            <span className="gender-label">Gender *</span>
            {['Male', 'Female', 'Other'].map(g => (
              <label key={g} className="gender-option">
                <input type="radio" name="gender" value={g.toLowerCase()} checked={form.gender === g.toLowerCase()} onChange={handleChange} />
                {g}
              </label>
            ))}
          </div>

          <input type="tel" name="phone" placeholder="Phone Number *" value={form.phone} onChange={handleChange} maxLength={10} />
          <input type="password" name="password" placeholder="Password *" value={form.password} onChange={handleChange} />

          <button type="submit" className="auth-btn">SIGN UP</button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
