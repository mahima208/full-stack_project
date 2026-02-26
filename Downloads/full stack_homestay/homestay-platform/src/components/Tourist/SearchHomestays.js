import React, { useState } from 'react';
import '../Admin/ManageUsers.css';
import PaymentModal from '../Common/PaymentModal';
import HomestayStorage from '../../utils/HomestayStorage';

const SearchHomestays = ({ user }) => {
  const [location, setLocation] = useState('');
  const [selectedHomestay, setSelectedHomestay] = useState(null);
  const homestays = HomestayStorage.getApprovedHomestays();

  const filteredHomestays = location
    ? homestays.filter(h => h.location.toLowerCase().includes(location.toLowerCase()))
    : homestays;

  const handlePaymentConfirm = (paymentData) => {
    alert(`Booking request sent successfully!\n\nHomestay: ${paymentData.homestay.name}\nHost: ${paymentData.homestay.hostName}\nCheck-in: ${paymentData.checkIn}\nCheck-out: ${paymentData.checkOut}\nTotal: ₹${paymentData.booking.totalAmount}\n\nStatus: Pending host approval\nThe host will review your request shortly.`);
    setSelectedHomestay(null);
  };

  return (
    <div className="manage-section">
      <h2>Search Homestays</h2>
      <input
        type="text"
        placeholder="Search by location..."
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ddd' }}
      />
      {filteredHomestays.length === 0 ? (
        <p>No homestays available in this location</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {filteredHomestays.map(homestay => (
            <div key={homestay.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', background: 'white' }}>
              <h3>{homestay.name}</h3>
              <p><strong>Location:</strong> {homestay.location}</p>
              <p><strong>Price:</strong> ₹{homestay.price}/night</p>
              <p><strong>Rooms:</strong> {homestay.rooms}</p>
              <p><strong>Amenities:</strong> {homestay.amenities}</p>
              <p><strong>Rating:</strong> ⭐ {homestay.rating}</p>
              <p style={{ fontSize: '14px', color: '#666' }}>{homestay.description}</p>
              <div style={{ marginTop: '15px', padding: '10px', background: '#f8f9fa', borderRadius: '5px' }}>
                <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Host:</strong> {homestay.hostName}</p>
                <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Contact:</strong> {homestay.hostPhone}</p>
              </div>
              <button
                onClick={() => setSelectedHomestay(homestay)}
                style={{ width: '100%', padding: '10px', background: '#667eea', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}
      {selectedHomestay && (
        <PaymentModal
          homestay={selectedHomestay}
          user={user}
          onClose={() => setSelectedHomestay(null)}
          onConfirm={handlePaymentConfirm}
        />
      )}
    </div>
  );
};

export default SearchHomestays;
