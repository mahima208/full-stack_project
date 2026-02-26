import React, { useState, useEffect } from 'react';
import '../Admin/ManageUsers.css';
import HomestayStorage from '../../utils/HomestayStorage';

const MyHomestays = ({ user }) => {
  const [homestays, setHomestays] = useState([]);

  useEffect(() => {
    const hostHomestays = HomestayStorage.getHomestaysByHost(user.email);
    setHomestays(hostHomestays);
  }, [user.email]);

  const deleteHomestay = (id) => {
    HomestayStorage.deleteHomestay(id);
    const hostHomestays = HomestayStorage.getHomestaysByHost(user.email);
    setHomestays(hostHomestays);
    alert('Homestay deleted successfully!');
  };

  return (
    <div className="manage-section">
      <h2>My Homestays</h2>
      {homestays.length === 0 ? (
        <p>No homestays listed yet. Add your first homestay!</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
          {homestays.map(homestay => (
            <div key={homestay.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', background: 'white' }}>
              <h3>{homestay.name}</h3>
              <p><strong>Location:</strong> {homestay.location}</p>
              <p><strong>Price:</strong> ₹{homestay.price}/night</p>
              <p><strong>Rooms:</strong> {homestay.rooms}</p>
              <p><span className={`status ${homestay.status}`}>{homestay.status}</span></p>
              <button onClick={() => deleteHomestay(homestay.id)} className="delete" style={{ marginTop: '10px' }}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyHomestays;
