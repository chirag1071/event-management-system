import React, { useState, useEffect } from "react";
import { Mail, Phone, MessageSquare, Trash2 } from 'lucide-react';
import "./ContactList.css";

const initialContacts = [
  { id: 1, fullName: "Sparks User",   email: "spark@gmail.com",      mobile_no: "8989898989", message: "Interested in a partnership." },
  { id: 2, fullName: "Uday Shrimali", email: "udshrimali@gmail.com",  mobile_no: "9876543210", message: "Venue inquiry for May." },
  { id: 3, fullName: "Samay Shah",    email: "samay@gmail.com",       mobile_no: "7777777777", message: "Hello admin, great platform!" },
  { id: 4, fullName: "Prince Jain",   email: "prince@gmail.com",      mobile_no: "1234567890", message: "Bug report on gallery." },
  { id: 5, fullName: "Chirag Gohil",  email: "chirag2605@gmail.com",  mobile_no: "6351284880", message: "Looking for sponsorship." },
];

const STORAGE_KEY = 'contacts';

// Initialize localStorage with defaults if never set before
if (!localStorage.getItem(STORAGE_KEY)) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialContacts));
}

const ContactList = () => {
  const [contacts, setContacts] = useState(() =>
    JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  );
  const [alert, setAlert] = useState('');

  // Only sync NEW messages added from frontend — don't overwrite admin deletions
  useEffect(() => {
    const syncNew = () => {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      // Only update if count increased (new message added from frontend)
      setContacts(prev => saved.length > prev.length ? saved : prev);
    };
    window.addEventListener('storage', syncNew);
    const interval = setInterval(syncNew, 1000);
    return () => {
      window.removeEventListener('storage', syncNew);
      clearInterval(interval);
    };
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Remove this inquiry?")) {
      const updated = contacts.filter(c => c.id !== id);
      setContacts(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setAlert('🗑️ Contact deleted successfully!');
      setTimeout(() => setAlert(''), 3000);
    }
  };

  return (
    <div className="admin-page-container">
      <div className="page-header">
        <h1>Inquiries & Messages</h1>
        <p>Manage all incoming communications from users.</p>
      </div>

      {alert && <div className="admin-alert success">{alert}</div>}

      <div className="admin-card">
        <table className="modern-admin-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Full Name</th>
              <th>Contact Details</th>
              <th>Message</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length === 0 ? (
              <tr><td colSpan={5} className="empty-row">No contacts found.</td></tr>
            ) : (
              contacts.map((contact, index) => (
                <tr key={contact.id}>
                  <td className="seq-num">{index + 1}</td>
                  <td>
                    <div className="user-info-cell">
                      <div className="avatar-small">{contact.fullName.charAt(0)}</div>
                      <strong>{contact.fullName}</strong>
                    </div>
                  </td>
                  <td>
                    <div className="contact-details-cell">
                      <span><Mail size={14} /> {contact.email}</span>
                      <span><Phone size={14} /> {contact.mobile_no}</span>
                    </div>
                  </td>
                  <td className="message-cell">
                    <div className="message-preview">
                      <MessageSquare size={14} />
                      <p>{contact.message}</p>
                    </div>
                  </td>
                  <td className="text-right">
                    <button className="icon-btn danger" onClick={() => handleDelete(contact.id)}>
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactList;
