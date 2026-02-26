import React, { useState } from 'react';
import Header from '../Common/Header';
import ManageUsers from './ManageUsers';
import ManageHomestays from './ManageHomestays';
import ManageContent from './ManageContent';
import Analytics from './Analytics';
import './AdminDashboard.css';

const AdminDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('analytics');

  return (
    <div>
      <Header user={user} onLogout={onLogout} />
      <div className="dashboard">
        <div className="sidebar">
          <button onClick={() => setActiveTab('analytics')} className={activeTab === 'analytics' ? 'active' : ''}>
            Analytics
          </button>
          <button onClick={() => setActiveTab('users')} className={activeTab === 'users' ? 'active' : ''}>
            Manage Users
          </button>
          <button onClick={() => setActiveTab('homestays')} className={activeTab === 'homestays' ? 'active' : ''}>
            Manage Homestays
          </button>
          <button onClick={() => setActiveTab('content')} className={activeTab === 'content' ? 'active' : ''}>
            Manage Content
          </button>
        </div>
        <div className="content">
          {activeTab === 'analytics' && <Analytics />}
          {activeTab === 'users' && <ManageUsers />}
          {activeTab === 'homestays' && <ManageHomestays />}
          {activeTab === 'content' && <ManageContent />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
