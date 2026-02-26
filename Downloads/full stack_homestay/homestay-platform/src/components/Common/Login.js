import React, { useState } from 'react';
import './Auth.css';

const Login = ({ onLogin, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'tourist'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Homestay Platform</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
            <option value="tourist">Tourist</option>
            <option value="host">Homestay Host</option>
            <option value="guide">Local Guide</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit">Login</button>
        </form>
        <p className="auth-switch">
          Don't have an account? <span onClick={onSwitchToRegister}>Register</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
