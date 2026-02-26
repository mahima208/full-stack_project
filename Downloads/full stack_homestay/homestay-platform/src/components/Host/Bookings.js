import React, { useState, useEffect } from 'react';
import '../Admin/ManageUsers.css';
import BookingStorage from '../../utils/BookingStorage';

const Bookings = ({ user }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const hostBookings = BookingStorage.getBookingsByHost(user.email);
    setBookings(hostBookings);
  }, [user.email]);

  const updateStatus = (id, status) => {
    BookingStorage.updateBookingStatus(id, status);
    const hostBookings = BookingStorage.getBookingsByHost(user.email);
    setBookings(hostBookings);
    alert(`Booking ${status === 'accepted' ? 'accepted' : 'rejected'} successfully!`);
  };

  return (
    <div className="manage-section">
      <h2>Booking Requests</h2>
      {bookings.length === 0 ? (
        <p>No booking requests yet</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {bookings.map(booking => (
            <div key={booking.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', background: 'white' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <h3>{booking.homestayName}</h3>
                  <p><strong>Guest:</strong> {booking.userName} ({booking.userEmail})</p>
                  <p><strong>Check-in:</strong> {booking.checkIn} | <strong>Check-out:</strong> {booking.checkOut}</p>
                  <p><strong>Nights:</strong> {booking.nights} | <strong>Homestay Amount:</strong> ₹{booking.homestayAmount}</p>
                  {booking.experiences && booking.experiences.length > 0 && (
                    <div style={{ marginTop: '10px', padding: '10px', background: '#f9f9f9', borderRadius: '5px' }}>
                      <strong>Guest Selected Experiences:</strong>
                      {booking.experiences.map((exp, idx) => (
                        <div key={idx} style={{ marginTop: '5px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span>{exp.icon}</span>
                          <span>{exp.name} - ₹{exp.price}</span>
                        </div>
                      ))}
                      <p style={{ marginTop: '10px' }}><strong>Experiences Total: ₹{booking.experiencesAmount}</strong></p>
                    </div>
                  )}
                  <p style={{ marginTop: '10px', fontSize: '18px' }}><strong>Total Amount: ₹{booking.totalAmount}</strong></p>
                  <p><span className={`status ${booking.status === 'accepted' ? 'active' : booking.status === 'pending' ? 'blocked' : 'blocked'}`}>{booking.status}</span></p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {booking.status === 'pending' && (
                    <>
                      <button onClick={() => updateStatus(booking.id, 'accepted')}>Accept</button>
                      <button onClick={() => updateStatus(booking.id, 'rejected')} className="delete">Reject</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;
