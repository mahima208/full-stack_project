import React, { useState } from 'react';
import '../Admin/ManageUsers.css';

const Recommendations = () => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    content: '',
    category: 'restaurant'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Recommendation added successfully!');
    setFormData({ title: '', location: '', content: '', category: 'restaurant' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="manage-section">
      <h2>Add Local Recommendation</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          >
            <option value="restaurant">Restaurant</option>
            <option value="attraction">Attraction</option>
            <option value="activity">Activity</option>
            <option value="tip">Travel Tip</option>
          </select>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows="5"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 30px', background: '#667eea', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Add Recommendation
        </button>
      </form>
    </div>
  );
};

export default Recommendations;
