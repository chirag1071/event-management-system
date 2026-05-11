import React, { useState } from "react";
import "./Sidebar.css";
import { Users, Calendar, FolderTree, Image, Notebook, LogOut, Settings, ChevronDown, ChevronRight, Shield, Lock, UserCheck, LayoutDashboard } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [settingsOpen, setSettingsOpen] = useState(
    location.pathname.includes('/admin/settings')
  );

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">⚡</span>
        <h2>Admin Panel</h2>
      </div>

      <nav className="sidebar-nav">
        <span className="nav-section-label">Main Menu</span>

        <Link to="/admin" className={`nav-item ${isActive('/admin') ? 'active' : ''}`}>
          <LayoutDashboard size={18} /> Dashboard
        </Link>
        <Link to="/admin/users" className={`nav-item ${isActive('/admin/users') ? 'active' : ''}`}>
          <Users size={18} /> User List
        </Link>
        <Link to="/admin/eventpost" className={`nav-item ${isActive('/admin/eventpost') ? 'active' : ''}`}>
          <Calendar size={18} /> Event Post
        </Link>
        <Link to="/admin/postcategory" className={`nav-item ${isActive('/admin/postcategory') ? 'active' : ''}`}>
          <FolderTree size={18} /> Post Category
        </Link>
        <Link to="/admin/galleryes" className={`nav-item ${isActive('/admin/galleryes') ? 'active' : ''}`}>
          <Image size={18} /> Gallery
        </Link>
        <Link to="/admin/contactlist" className={`nav-item ${isActive('/admin/contactlist') ? 'active' : ''}`}>
          <Notebook size={18} /> Contact List
        </Link>

        <span className="nav-section-label" style={{ marginTop: 16 }}>Configuration</span>

        {/* Settings Accordion */}
        <div className="nav-accordion">
          <button
            className={`nav-item accordion-trigger ${settingsOpen ? 'open' : ''}`}
            onClick={() => setSettingsOpen(!settingsOpen)}
          >
            <Settings size={18} /> Settings
            {settingsOpen ? <ChevronDown size={16} className="chevron" /> : <ChevronRight size={16} className="chevron" />}
          </button>

          {settingsOpen && (
            <div className="accordion-body">
              <Link to="/admin/settings/system" className={`nav-sub-item ${isActive('/admin/settings/system') ? 'active' : ''}`}>
                <Lock size={15} /> System Config
              </Link>
              <Link to="/admin/settings/security" className={`nav-sub-item ${isActive('/admin/settings/security') ? 'active' : ''}`}>
                <Shield size={15} /> Security
              </Link>
              <Link to="/admin/settings/roles" className={`nav-sub-item ${isActive('/admin/settings/roles') ? 'active' : ''}`}>
                <UserCheck size={15} /> Roles
              </Link>
            </div>
          )}
        </div>

        <div className="sidebar-divider" />

        <Link to="/login" className="nav-item logout-item">
          <LogOut size={18} /> Logout
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
