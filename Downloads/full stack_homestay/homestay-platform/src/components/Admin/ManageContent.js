import React, { useState } from 'react';
import './ManageUsers.css';

const ManageContent = () => {
  const [attractions, setAttractions] = useState([
    { id: 1, name: 'Taj Mahal', location: 'Agra', type: 'Monument' },
    { id: 2, name: 'Gateway of India', location: 'Mumbai', type: 'Landmark' }
  ]);
  const [newAttraction, setNewAttraction] = useState({ name: '', location: '', type: '' });

  const addAttraction = () => {
    if (newAttraction.name && newAttraction.location && newAttraction.type) {
      setAttractions([...attractions, { ...newAttraction, id: Date.now() }]);
      setNewAttraction({ name: '', location: '', type: '' });
    }
  };

  const deleteAttraction = (id) => {
    setAttractions(attractions.filter(a => a.id !== id));
  };

  return (
    <div className="manage-section">
      <h2>Manage Tourist Attractions</h2>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Attraction Name"
          value={newAttraction.name}
          onChange={(e) => setNewAttraction({ ...newAttraction, name: e.target.value })}
          style={{ padding: '8px', marginRight: '10px', width: '200px' }}
        />
        <input
          type="text"
          placeholder="Location"
          value={newAttraction.location}
          onChange={(e) => setNewAttraction({ ...newAttraction, location: e.target.value })}
          style={{ padding: '8px', marginRight: '10px', width: '150px' }}
        />
        <input
          type="text"
          placeholder="Type"
          value={newAttraction.type}
          onChange={(e) => setNewAttraction({ ...newAttraction, type: e.target.value })}
          style={{ padding: '8px', marginRight: '10px', width: '150px' }}
        />
        <button onClick={addAttraction} style={{ padding: '8px 20px' }}>Add</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {attractions.map(attraction => (
            <tr key={attraction.id}>
              <td>{attraction.name}</td>
              <td>{attraction.location}</td>
              <td>{attraction.type}</td>
              <td>
                <button onClick={() => deleteAttraction(attraction.id)} className="delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageContent;
