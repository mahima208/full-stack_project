import React, { useState } from 'react';
import '../Admin/ManageUsers.css';

const Attractions = () => {
  const [attractions] = useState([
    { id: 1, name: 'Taj Mahal', location: 'Agra', type: 'Monument', description: 'Iconic white marble mausoleum', distance: '5 km' },
    { id: 2, name: 'Gateway of India', location: 'Mumbai', type: 'Landmark', description: 'Historic arch monument', distance: '2 km' },
    { id: 3, name: 'Goa Beaches', location: 'Goa', type: 'Beach', description: 'Beautiful coastal beaches', distance: '1 km' },
    { id: 4, name: 'Backwaters', location: 'Kerala', type: 'Nature', description: 'Scenic water bodies', distance: '3 km' }
  ]);
  const [filter, setFilter] = useState('');

  const filteredAttractions = filter
    ? attractions.filter(a => a.location.toLowerCase().includes(filter.toLowerCase()) || a.name.toLowerCase().includes(filter.toLowerCase()))
    : attractions;

  return (
    <div className="manage-section">
      <h2>Tourist Attractions</h2>
      <input
        type="text"
        placeholder="Search attractions..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ddd' }}
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {filteredAttractions.map(attraction => (
          <div key={attraction.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', background: 'white' }}>
            <h3>{attraction.name}</h3>
            <p><strong>Location:</strong> {attraction.location}</p>
            <p><strong>Type:</strong> {attraction.type}</p>
            <p><strong>Distance:</strong> {attraction.distance}</p>
            <p>{attraction.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attractions;
