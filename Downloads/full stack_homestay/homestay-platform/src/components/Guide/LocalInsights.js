import React, { useState } from 'react';
import '../Admin/ManageUsers.css';

const LocalInsights = () => {
  const [insights, setInsights] = useState([
    { id: 1, title: 'Best time to visit Goa', content: 'November to February is ideal for beach activities', location: 'Goa', likes: 45 },
    { id: 2, title: 'Hidden gems in Kerala', content: 'Visit Munnar tea gardens early morning for best views', location: 'Kerala', likes: 32 }
  ]);

  const deleteInsight = (id) => {
    setInsights(insights.filter(i => i.id !== id));
  };

  return (
    <div className="manage-section">
      <h2>My Local Insights</h2>
      <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
        {insights.map(insight => (
          <div key={insight.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', background: 'white' }}>
            <h3>{insight.title}</h3>
            <p><strong>Location:</strong> {insight.location}</p>
            <p>{insight.content}</p>
            <p><strong>👍 {insight.likes} likes</strong></p>
            <button onClick={() => deleteInsight(insight.id)} className="delete">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocalInsights;
