import React from 'react';
import './Header.css';

const Header = ({ user, onLogout }) => {
  return (
    <header className="header">
      <h2>Homestay Platform - {user.role.toUpperCase()}</h2>
      <div className="header-right">
        <span>Welcome, {user.username}</span>
        <button onClick={onLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;
