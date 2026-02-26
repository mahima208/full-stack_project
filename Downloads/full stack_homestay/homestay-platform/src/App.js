import React, { useState } from 'react';
import './App.css';
import Login from './components/Common/Login';
import Register from './components/Common/Register';
import AdminDashboard from './components/Admin/AdminDashboard';
import HostDashboard from './components/Host/HostDashboard';
import TouristDashboard from './components/Tourist/TouristDashboard';
import GuideDashboard from './components/Guide/GuideDashboard';
import UserStorage from './utils/UserStorage';

function App() {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = (userData) => {
    const result = UserStorage.login(userData.email, userData.password);
    if (result.success) {
      setUser(result.user);
    } else {
      alert(result.message);
    }
  };

  const handleRegister = (userData) => {
    const result = UserStorage.register(userData);
    if (result.success) {
      alert('Registration successful! Please login.');
      setIsLogin(true);
    } else {
      alert(result.message);
    }
  };

  const handleLogout = () => setUser(null);

  return (
    <div className="App">
      {!user ? (
        isLogin ? (
          <Login onLogin={handleLogin} onSwitchToRegister={() => setIsLogin(false)} />
        ) : (
          <Register onRegister={handleRegister} onSwitchToLogin={() => setIsLogin(true)} />
        )
      ) : user.role === 'admin' ? (
        <AdminDashboard user={user} onLogout={handleLogout} />
      ) : user.role === 'host' ? (
        <HostDashboard user={user} onLogout={handleLogout} />
      ) : user.role === 'tourist' ? (
        <TouristDashboard user={user} onLogout={handleLogout} />
      ) : (
        <GuideDashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
