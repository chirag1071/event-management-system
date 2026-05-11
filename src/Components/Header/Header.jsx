import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { User, LogOut, Calendar, Menu, X } from 'lucide-react'
import './Header.css'

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    const syncUser = () => {
      const u = JSON.parse(localStorage.getItem('loggedUser'));
      setLoggedUser(u);
    };
    syncUser();
    window.addEventListener('storage', syncUser);
    return () => window.removeEventListener('storage', syncUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    setLoggedUser(null);
    setOpen(false);
    navigate('/login');
  };

  return (
    <nav className="navbar-modern">
      <div className="nav-container">
        <div className="navbar-logo">
          <Link to="/"><img src="logo1.png" alt="Harmoni" /></Link>
        </div>

        <button className="mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`nav-links-modern ${mobileMenu ? 'active' : ''}`}>
          <Link to="/" onClick={() => setMobileMenu(false)}>HOME</Link>
          <Link to="/about" onClick={() => setMobileMenu(false)}>ABOUT</Link>
          <Link to="/event" onClick={() => setMobileMenu(false)}>EVENTS</Link>
          <Link to="/gallery" onClick={() => setMobileMenu(false)}>GALLERY</Link>
          <Link to="/contact" onClick={() => setMobileMenu(false)}>CONTACT</Link>
          {!loggedUser && (
            <Link to="/register" className="nav-register-btn" onClick={() => setMobileMenu(false)}>REGISTER</Link>
          )}
        </div>

        <div className="user-section">
          {loggedUser ? (
            <>
              <div className="profile-wrapper" onClick={() => setOpen(!open)}>
                {loggedUser.photo ? (
                  <img src={loggedUser.photo} alt="Profile" className="user-avatar-modern" />
                ) : (
                  <div className="user-avatar-initials">
                    {loggedUser.fullname?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="username-modern">{loggedUser.fullname?.split(' ')[0]}</span>
              </div>

              {open && (
                <div className="dropdown-modern">
                  <div className="dropdown-user-info">
                    {loggedUser.photo ? (
                      <img src={loggedUser.photo} alt="Profile" className="dropdown-avatar" />
                    ) : (
                      <div className="dropdown-avatar-initials">
                        {loggedUser.fullname?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="dropdown-name">{loggedUser.fullname}</p>
                      <p className="dropdown-email">{loggedUser.email}</p>
                    </div>
                  </div>
                  <hr />
                  <Link to="/account" onClick={() => setOpen(false)}>
                    <User size={16} /> Account
                  </Link>
                  <Link to="/mybooking" onClick={() => setOpen(false)}>
                    <Calendar size={16} /> My Booking
                  </Link>
                  <hr />
                  <button className="logout-link" onClick={handleLogout}>
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link to="/login" className="nav-login-btn">LOGIN</Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
