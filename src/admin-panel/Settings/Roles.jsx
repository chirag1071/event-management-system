import React, { useState } from 'react';
import './Settings.css';
import { Plus, Trash2, UserCheck, Check } from 'lucide-react';

const allPermissions = ['View Users', 'Edit Users', 'Delete Users', 'Post Events', 'Manage Gallery', 'View Reports', 'Manage Settings', 'Contact List'];

const initialRoles = [
  { id: 1, name: 'Super Admin', color: '#ef4444', permissions: allPermissions },
  { id: 2, name: 'Event Manager', color: '#ff8800', permissions: ['Post Events', 'Manage Gallery', 'View Reports'] },
  { id: 3, name: 'Moderator', color: '#3b82f6', permissions: ['View Users', 'Contact List', 'View Reports'] },
  { id: 4, name: 'Viewer', color: '#64748b', permissions: ['View Users', 'View Reports'] },
];

const Roles = () => {
  const [roles, setRoles] = useState(initialRoles);
  const [selected, setSelected] = useState(initialRoles[0]);
  const [newRoleName, setNewRoleName] = useState('');
  const [alert, setAlert] = useState('');

  const showAlert = (msg) => { setAlert(msg); setTimeout(() => setAlert(''), 3000); };

  const togglePermission = (perm) => {
    const updated = selected.permissions.includes(perm)
      ? selected.permissions.filter(p => p !== perm)
      : [...selected.permissions, perm];
    const updatedRole = { ...selected, permissions: updated };
    setSelected(updatedRole);
    setRoles(prev => prev.map(r => r.id === selected.id ? updatedRole : r));
  };

  const addRole = () => {
    if (!newRoleName.trim()) { showAlert('⚠️ Enter a role name!'); return; }
    const colors = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];
    const newRole = { id: Date.now(), name: newRoleName.trim(), color: colors[roles.length % colors.length], permissions: [] };
    setRoles(prev => [...prev, newRole]);
    setNewRoleName('');
    showAlert('✅ Role created successfully!');
  };

  const deleteRole = (id) => {
    if (roles.find(r => r.id === id)?.name === 'Super Admin') { showAlert('⚠️ Cannot delete Super Admin role!'); return; }
    if (window.confirm('Delete this role?')) {
      setRoles(prev => prev.filter(r => r.id !== id));
      if (selected.id === id) setSelected(roles[0]);
      showAlert('🗑️ Role deleted.');
    }
  };

  const savePermissions = () => showAlert('✅ Permissions saved successfully!');

  return (
    <div className="admin-page-container">
      <div className="page-header">
        <h1>Roles & Permissions</h1>
        <p>Manage user roles and their access permissions.</p>
      </div>

      {alert && <div className={`admin-alert ${alert.startsWith('✅') || alert.startsWith('🗑️') ? 'success' : 'error'}`}>{alert}</div>}

      <div className="roles-layout">
        {/* Roles List */}
        <div className="settings-card roles-panel">
          <h3 className="settings-section-title"><UserCheck size={18} /> All Roles</h3>

          <div className="add-role-row">
            <input
              type="text"
              placeholder="New role name..."
              value={newRoleName}
              onChange={e => setNewRoleName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addRole()}
            />
            <button className="add-role-btn" onClick={addRole}><Plus size={16} /></button>
          </div>

          <div className="roles-list">
            {roles.map(role => (
              <div
                key={role.id}
                className={`role-item ${selected.id === role.id ? 'active' : ''}`}
                onClick={() => setSelected(role)}
              >
                <div className="role-dot" style={{ background: role.color }} />
                <div className="role-info">
                  <span className="role-name">{role.name}</span>
                  <span className="role-perm-count">{role.permissions.length} permissions</span>
                </div>
                {role.name !== 'Super Admin' && (
                  <button className="role-delete-btn" onClick={e => { e.stopPropagation(); deleteRole(role.id); }}>
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Permissions Panel */}
        <div className="settings-card permissions-panel">
          <div className="perm-header">
            <div>
              <h3 className="settings-section-title" style={{ marginBottom: 4 }}>
                <span className="role-dot-inline" style={{ background: selected.color }} />
                {selected.name}
              </h3>
              <p style={{ color: '#64748b', fontSize: 13 }}>{selected.permissions.length} of {allPermissions.length} permissions enabled</p>
            </div>
            <button className="settings-save-btn small" onClick={savePermissions}>
              <Check size={16} /> Save
            </button>
          </div>

          <div className="permissions-grid">
            {allPermissions.map(perm => {
              const active = selected.permissions.includes(perm);
              return (
                <div
                  key={perm}
                  className={`perm-card ${active ? 'active' : ''}`}
                  onClick={() => togglePermission(perm)}
                >
                  <div className={`perm-check ${active ? 'checked' : ''}`}>
                    {active && <Check size={14} />}
                  </div>
                  <span>{perm}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roles;
