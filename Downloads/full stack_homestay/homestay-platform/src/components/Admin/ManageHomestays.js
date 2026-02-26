import React, { useState, useEffect } from 'react';
import './ManageUsers.css';
import HomestayStorage from '../../utils/HomestayStorage';

const ManageHomestays = () => {
  const [homestays, setHomestays] = useState([]);

  useEffect(() => {
    setHomestays(HomestayStorage.getAllHomestays());
  }, []);

  const updateStatus = (id, status) => {
    HomestayStorage.updateHomestayStatus(id, status);
    setHomestays(HomestayStorage.getAllHomestays());
    alert(`Homestay ${status} successfully!`);
  };

  const deleteHomestay = (id) => {
    HomestayStorage.deleteHomestay(id);
    setHomestays(HomestayStorage.getAllHomestays());
    alert('Homestay deleted successfully!');
  };

  return (
    <div className="manage-section">
      <h2>Manage Homestays</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Host</th>
            <th>Location</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {homestays.map(homestay => (
            <tr key={homestay.id}>
              <td>{homestay.id}</td>
              <td>{homestay.name}</td>
              <td>{homestay.hostEmail}</td>
              <td>{homestay.location}</td>
              <td>₹{homestay.price}</td>
              <td><span className={`status ${homestay.status}`}>{homestay.status}</span></td>
              <td>
                {homestay.status === 'pending' && (
                  <button onClick={() => updateStatus(homestay.id, 'approved')}>Approve</button>
                )}
                {homestay.status === 'approved' && (
                  <button onClick={() => updateStatus(homestay.id, 'blocked')}>Block</button>
                )}
                {homestay.status === 'blocked' && (
                  <button onClick={() => updateStatus(homestay.id, 'approved')}>Unblock</button>
                )}
                <button onClick={() => deleteHomestay(homestay.id)} className="delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageHomestays;
