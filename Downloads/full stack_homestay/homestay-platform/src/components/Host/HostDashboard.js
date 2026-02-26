import React, { useState } from 'react';
import Header from '../Common/Header';
import MyHomestays from './MyHomestays';
import AddHomestay from './AddHomestay';
import Bookings from './Bookings';
import Notifications from '../Common/Notifications';
import '../Admin/AdminDashboard.css';

const HostDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('homestays');

  return (
    <div>
      <Header user={user} onLogout={onLogout} />
      <div className="dashboard">
        <div className="sidebar">
          <button onClick={() => setActiveTab('homestays')} className={activeTab === 'homestays' ? 'active' : ''}>
            My Homestays
          </button>
          <button onClick={() => setActiveTab('add')} className={activeTab === 'add' ? 'active' : ''}>
            Add Homestay
          </button>
          <button onClick={() => setActiveTab('bookings')} className={activeTab === 'bookings' ? 'active' : ''}>
            Bookings
          </button>
          <button onClick={() => setActiveTab('notifications')} className={activeTab === 'notifications' ? 'active' : ''}>
            Notifications
          </button>
        </div>
        <div className="content">
          {activeTab === 'homestays' && <MyHomestays user={user} />}
          {activeTab === 'add' && <AddHomestay user={user} />}
          {activeTab === 'bookings' && <Bookings user={user} />}
          {activeTab === 'notifications' && <Notifications role="host" />}
        </div>
      </div>
    </div>
  );
};

export default HostDashboard;
