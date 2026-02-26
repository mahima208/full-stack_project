import React from 'react';
import './Analytics.css';
import UserStorage from '../../utils/UserStorage';
import HomestayStorage from '../../utils/HomestayStorage';
import BookingStorage from '../../utils/BookingStorage';

const Analytics = () => {
  const users = UserStorage.getAllUsers();
  const homestays = HomestayStorage.getAllHomestays();
  const bookings = BookingStorage.getAllBookings();

  const totalRevenue = bookings
    .filter(b => b.status === 'accepted')
    .reduce((sum, b) => sum + b.totalAmount, 0);

  const stats = {
    totalUsers: users.length,
    totalHomestays: homestays.length,
    totalBookings: bookings.length,
    revenue: totalRevenue,
    activeHosts: users.filter(u => u.role === 'host').length,
    activeTourists: users.filter(u => u.role === 'tourist').length
  };

  return (
    <div className="analytics-section">
      <h2>Platform Analytics</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{stats.totalUsers}</h3>
            <p>Total Users</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏠</div>
          <div className="stat-info">
            <h3>{stats.totalHomestays}</h3>
            <p>Total Homestays</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <h3>{stats.totalBookings}</h3>
            <p>Total Bookings</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>₹{stats.revenue.toLocaleString()}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔑</div>
          <div className="stat-info">
            <h3>{stats.activeHosts}</h3>
            <p>Active Hosts</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✈️</div>
          <div className="stat-info">
            <h3>{stats.activeTourists}</h3>
            <p>Active Tourists</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
