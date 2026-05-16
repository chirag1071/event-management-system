import React, { useState } from "react";
import "./Logouts.css";

const Logoutt = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState({
    fullName: "Event Management",
    email: "event@gmail.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle update personal detail
  const handlePersonalUpdate = (e) => {
    e.preventDefault();
    alert("✅ Personal details updated successfully!");
  };

  // Handle password update
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("❌ New password and confirm password do not match!");
      return;
    }
    alert("✅ Password updated successfully!");
  };

  return (
    <div className="profile-page">
      <h2 className="page-title">Admin Profile</h2>

      <div className="tab-buttons">
        <button
          className={activeTab === "personal" ? "active" : ""}
          onClick={() => setActiveTab("personal")}
        >
          Personal Detail
        </button>
        <button
          className={activeTab === "password" ? "active" : ""}
          onClick={() => setActiveTab("password")}
        >
          Change Password
        </button>
      </div>

      {activeTab === "personal" ? (
        <form className="form-box" onSubmit={handlePersonalUpdate}>
          <h3>Personal Details</h3>

          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />

          <label>Email Address:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <button type="submit" className="btn-update">
            Update
          </button>
        </form>
      ) : (
        <form className="form-box" onSubmit={handlePasswordUpdate}>
          <h3>Change Password</h3>

          <label>Current Password:</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
          />

          <label>New Password:</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />

          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <button type="submit" className="btn-update">
            Update Password
          </button>
        </form>
      )}
    </div>
  );
};

export default ProfilePage;
