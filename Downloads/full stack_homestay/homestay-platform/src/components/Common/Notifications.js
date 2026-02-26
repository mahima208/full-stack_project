import React, { useState } from 'react';
import './Notifications.css';

const Notifications = ({ role }) => {
  const [notifications] = useState([
    { id: 1, type: 'booking', message: 'New booking request for Cozy Villa', time: '5 min ago', read: false },
    { id: 2, type: 'payment', message: 'Payment received for Beach House', time: '1 hour ago', read: false },
    { id: 3, type: 'review', message: 'New review posted on Mountain Retreat', time: '2 hours ago', read: true }
  ]);

  return (
    <div className="notifications-panel">
      <h3>Notifications</h3>
      <div className="notifications-list">
        {notifications.map(notif => (
          <div key={notif.id} className={`notification-item ${notif.read ? 'read' : 'unread'}`}>
            <div className="notif-icon">
              {notif.type === 'booking' && '📅'}
              {notif.type === 'payment' && '💳'}
              {notif.type === 'review' && '⭐'}
            </div>
            <div className="notif-content">
              <p>{notif.message}</p>
              <small>{notif.time}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
