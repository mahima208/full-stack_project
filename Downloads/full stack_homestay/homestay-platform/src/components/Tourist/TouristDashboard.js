import React, { useState } from 'react';
import Header from '../Common/Header';
import SearchHomestays from './SearchHomestays';
import MyBookings from './MyBookings';
import Attractions from './Attractions';
import Wishlist from './Wishlist';
import GuideBooking from './GuideBooking';
import '../Admin/AdminDashboard.css';

const TouristDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('search');

  return (
    <div>
      <Header user={user} onLogout={onLogout} />
      <div className="dashboard">
        <div className="sidebar">
          <button onClick={() => setActiveTab('search')} className={activeTab === 'search' ? 'active' : ''}>
            Search Homestays
          </button>
          <button onClick={() => setActiveTab('bookings')} className={activeTab === 'bookings' ? 'active' : ''}>
            My Bookings
          </button>
          <button onClick={() => setActiveTab('guides')} className={activeTab === 'guides' ? 'active' : ''}>
            Book a Guide
          </button>
          <button onClick={() => setActiveTab('wishlist')} className={activeTab === 'wishlist' ? 'active' : ''}>
            Wishlist
          </button>
          <button onClick={() => setActiveTab('attractions')} className={activeTab === 'attractions' ? 'active' : ''}>
            Tourist Attractions
          </button>
        </div>
        <div className="content">
          {activeTab === 'search' && <SearchHomestays user={user} />}
          {activeTab === 'bookings' && <MyBookings user={user} />}
          {activeTab === 'guides' && <GuideBooking user={user} />}
          {activeTab === 'wishlist' && <Wishlist />}
          {activeTab === 'attractions' && <Attractions />}
        </div>
      </div>
    </div>
  );
};

export default TouristDashboard;
