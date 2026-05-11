import React, { useState } from "react";
import "./UserList.css";
import { Shield, ShieldOff, Mail, Phone, Search, Edit2, Trash2, X, Bell } from "lucide-react";

const initialUsers = [
  { id: 1, name: "Chirag Bavaliya", email: "chirag@gmail.com", gender: "Male", phone: "7755934563", status: "Active" },
  { id: 2, name: "Uday Chavda", email: "uday@gmail.com", gender: "Male", phone: "7777777777", status: "Blocked" },
  { id: 3, name: "Ajay Parmar", email: "ajay@gmail.com", gender: "Male", phone: "9999999999", status: "Active" },
  { id: 4, name: "Jani Meher", email: "jani@gmail.com", gender: "Male", phone: "7852152960", status: "Active" },
  { id: 5, name: "Titu Ahir", email: "titu@gmail.com", gender: "Male", phone: "7852152969", status: "Active" },
  { id: 6, name: "Khushbu Vyas", email: "khushi@gmail.com", gender: "Female", phone: "1234567891", status: "Active" },
  { id: 7, name: "White Death", email: "wh1te@gmail.com", gender: "Male", phone: "8888888888", status: "Blocked" },
];

const UserList = () => {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [editUser, setEditUser] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [showNotif, setShowNotif] = useState(false);

  const addNotif = (msg) => {
    const n = { id: Date.now(), msg, time: new Date().toLocaleTimeString() };
    setNotifications(prev => [n, ...prev].slice(0, 10));
  };

  const toggleStatus = (id) => {
    setUsers(prev => prev.map(u => {
      if (u.id !== id) return u;
      const newStatus = u.status === "Active" ? "Blocked" : "Active";
      addNotif(`${u.name} has been ${newStatus === "Blocked" ? "blocked" : "unblocked"}.`);
      return { ...u, status: newStatus };
    }));
  };

  const deleteUser = (id) => {
    const u = users.find(u => u.id === id);
    if (window.confirm(`Delete user "${u.name}"?`)) {
      setUsers(prev => prev.filter(u => u.id !== id));
      addNotif(`User "${u.name}" has been deleted.`);
    }
  };

  const openEdit = (user) => {
    setEditUser(user);
    setEditForm({ name: user.name, email: user.email, phone: user.phone, gender: user.gender });
  };

  const saveEdit = () => {
    setUsers(prev => prev.map(u => u.id === editUser.id ? { ...u, ...editForm, name: editForm.name } : u));
    addNotif(`Profile of "${editForm.name}" updated.`);
    setEditUser(null);
  };

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.phone.includes(search)
  );

  const unread = notifications.length;

  return (
    <div className="user-list-container">
      <div className="page-header-row">
        <div>
          <h1 className="page-title">User Management</h1>
          <p className="page-subtitle">Manage and monitor all registered users.</p>
        </div>
        <div className="header-actions">
          <div className="search-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="notif-wrapper">
            <button className="notif-btn" onClick={() => setShowNotif(!showNotif)}>
              <Bell size={20} />
              {unread > 0 && <span className="notif-badge">{unread}</span>}
            </button>
            {showNotif && (
              <div className="notif-dropdown">
                <div className="notif-header">
                  <h4>Notifications</h4>
                  <button onClick={() => { setNotifications([]); setShowNotif(false); }}>Clear all</button>
                </div>
                {notifications.length === 0 ? (
                  <p className="notif-empty">No notifications</p>
                ) : (
                  notifications.map(n => (
                    <div className="notif-item" key={n.id}>
                      <span className="notif-dot" />
                      <div>
                        <p>{n.msg}</p>
                        <small>{n.time}</small>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="table-card">
        <table className="user-table">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Contact Info</th>
              <th>Gender</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user, index) => (
              <tr key={user.id}>
                <td className="row-num">{index + 1}</td>
                <td>
                  <div className="user-info">
                    <div className="user-avatar-circle">{user.name.charAt(0)}</div>
                    <div className="user-details">
                      <span className="user-name">{user.name}</span>
                      <span className="user-id">ID: USR-00{user.id}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="contact-info">
                    <div className="info-item"><Mail size={14} /> {user.email}</div>
                    <div className="info-item"><Phone size={14} /> {user.phone}</div>
                  </div>
                </td>
                <td>{user.gender}</td>
                <td>
                  <span className={`status-badge ${user.status.toLowerCase()}`}>{user.status}</span>
                </td>
                <td>
                  <div className="action-btns">
                    <button
                      className={user.status === "Blocked" ? "btn-action unblock" : "btn-action block"}
                      title={user.status === "Blocked" ? "Unblock" : "Block"}
                      onClick={() => toggleStatus(user.id)}
                    >
                      {user.status === "Blocked" ? <Shield size={16} /> : <ShieldOff size={16} />}
                      {user.status === "Blocked" ? "Unblock" : "Block"}
                    </button>
                    <button className="btn-action edit" onClick={() => openEdit(user)}>
                      <Edit2 size={16} /> Edit
                    </button>
                    <button className="btn-action delete" onClick={() => deleteUser(user.id)}>
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="no-results">No users found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editUser && (
        <div className="modal-overlay" onClick={() => setEditUser(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit User Profile</h3>
              <button onClick={() => setEditUser(null)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              {[['name','Full Name','text'],['email','Email','email'],['phone','Phone','tel']].map(([key, label, type]) => (
                <div className="modal-field" key={key}>
                  <label>{label}</label>
                  <input
                    type={type}
                    value={editForm[key]}
                    onChange={e => setEditForm({ ...editForm, [key]: e.target.value })}
                  />
                </div>
              ))}
              <div className="modal-field">
                <label>Gender</label>
                <select value={editForm.gender} onChange={e => setEditForm({ ...editForm, gender: e.target.value })}>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel-modal" onClick={() => setEditUser(null)}>Cancel</button>
              <button className="btn-save-modal" onClick={saveEdit}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
