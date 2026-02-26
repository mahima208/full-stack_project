import React, { useState } from 'react';
import Header from '../Common/Header';
import LocalInsights from './LocalInsights';
import Recommendations from './Recommendations';
import '../Admin/AdminDashboard.css';

const GuideDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('insights');

  return (
    <div>
      <Header user={user} onLogout={onLogout} />
      <div className="dashboard">
        <div className="sidebar">
          <button onClick={() => setActiveTab('insights')} className={activeTab === 'insights' ? 'active' : ''}>
            Local Insights
          </button>
          <button onClick={() => setActiveTab('recommendations')} className={activeTab === 'recommendations' ? 'active' : ''}>
            Add Recommendations
          </button>
        </div>
        <div className="content">
          {activeTab === 'insights' && <LocalInsights />}
          {activeTab === 'recommendations' && <Recommendations />}
        </div>
      </div>
    </div>
  );
};

export default GuideDashboard;
