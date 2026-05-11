import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ phone: '', password: '' });
  const [alert, setAlert] = useState({ msg: '', type: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.phone === form.phone && u.password === form.password);

    if (!form.phone || !form.password) {
      setAlert({ msg: '⚠️ Please fill all fields!', type: 'error' });
      return;
    }
    if (!user) {
      setAlert({ msg: '❌ Invalid phone or password!', type: 'error' });
      return;
    }

    localStorage.setItem('loggedUser', JSON.stringify(user));
    setAlert({ msg: '✅ Login successful! Redirecting...', type: 'success' });
    setTimeout(() => navigate('/'), 1500);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-icon">🔐</div>
        <h2>Sign In</h2>

        {alert.msg && (
          <div className={`alert-box ${alert.type}`}>{alert.msg}</div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="tel"
            name="phone"
            placeholder="Mobile Number *"
            value={form.phone}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password *"
            value={form.password}
            onChange={handleChange}
          />

          <div className="remember-row">
            <label><input type="checkbox" /> Remember me</label>
          </div>

          <button type="submit" className="auth-btn">SIGN IN</button>

          <div className="auth-links">
            <Link to="/register">Don't have an account? Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
