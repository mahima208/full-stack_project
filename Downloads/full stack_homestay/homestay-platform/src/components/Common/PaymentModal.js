import React, { useState } from 'react';
import './PaymentModal.css';
import BookingStorage from '../../utils/BookingStorage';
import ExperienceStorage from '../../utils/ExperienceStorage';

const PaymentModal = ({ homestay, user, onClose, onConfirm }) => {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    checkIn: '',
    checkOut: ''
  });
  const [selectedExperiences, setSelectedExperiences] = useState([]);
  const experiences = ExperienceStorage.getAllExperiences();

  const calculateNights = () => {
    if (paymentData.checkIn && paymentData.checkOut) {
      const start = new Date(paymentData.checkIn);
      const end = new Date(paymentData.checkOut);
      const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      return nights > 0 ? nights : 0;
    }
    return 0;
  };

  const toggleExperience = (expId) => {
    setSelectedExperiences(prev => 
      prev.includes(expId) ? prev.filter(id => id !== expId) : [...prev, expId]
    );
  };

  const experiencesTotal = selectedExperiences.reduce((sum, expId) => {
    const exp = experiences.find(e => e.id === expId);
    return sum + (exp ? exp.price : 0);
  }, 0);

  const homestayTotal = calculateNights() * homestay.price;
  const totalAmount = homestayTotal + experiencesTotal;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (calculateNights() <= 0) {
      alert('Check-out date must be after check-in date');
      return;
    }

    const selectedExpDetails = selectedExperiences.map(expId => 
      experiences.find(e => e.id === expId)
    );

    const booking = BookingStorage.createBooking({
      homestayId: homestay.id,
      homestayName: homestay.name,
      userEmail: user.email,
      userName: user.username,
      hostEmail: homestay.hostEmail,
      checkIn: paymentData.checkIn,
      checkOut: paymentData.checkOut,
      nights: calculateNights(),
      homestayAmount: homestayTotal,
      experiences: selectedExpDetails,
      experiencesAmount: experiencesTotal,
      totalAmount: totalAmount,
      paymentDetails: {
        cardName: paymentData.cardName,
        cardLast4: paymentData.cardNumber.slice(-4)
      }
    });

    onConfirm({ ...paymentData, homestay, booking });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Payment Details</h2>
        <div className="booking-summary">
          <h3>{homestay.name}</h3>
          <p>Location: {homestay.location}</p>
          <p>Price: ₹{homestay.price}/night</p>
          {calculateNights() > 0 && (
            <>
              <p><strong>Nights: {calculateNights()}</strong></p>
              <p><strong>Homestay Total: ₹{homestayTotal}</strong></p>
            </>
          )}
        </div>

        <div className="experiences-section">
          <h3>Add Local Experiences</h3>
          {experiences.map(exp => (
            <label key={exp.id} className="experience-item">
              <input
                type="checkbox"
                checked={selectedExperiences.includes(exp.id)}
                onChange={() => toggleExperience(exp.id)}
              />
              <div className="exp-details">
                <span className="exp-icon">{exp.icon}</span>
                <div>
                  <strong>{exp.name}</strong>
                  <p>{exp.description}</p>
                  <small>{exp.duration} • ₹{exp.price}</small>
                </div>
              </div>
            </label>
          ))}
          {experiencesTotal > 0 && (
            <p className="exp-total"><strong>Experiences Total: ₹{experiencesTotal}</strong></p>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Check-in Date</label>
              <input
                type="date"
                value={paymentData.checkIn}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setPaymentData({ ...paymentData, checkIn: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Check-out Date</label>
              <input
                type="date"
                value={paymentData.checkOut}
                min={paymentData.checkIn || new Date().toISOString().split('T')[0]}
                onChange={(e) => setPaymentData({ ...paymentData, checkOut: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Card Number</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              maxLength="19"
              value={paymentData.cardNumber}
              onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value.replace(/\s/g, '') })}
              required
            />
          </div>
          <div className="form-group">
            <label>Cardholder Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={paymentData.cardName}
              onChange={(e) => setPaymentData({ ...paymentData, cardName: e.target.value })}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                maxLength="5"
                value={paymentData.expiryDate}
                onChange={(e) => setPaymentData({ ...paymentData, expiryDate: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>CVV</label>
              <input
                type="password"
                placeholder="123"
                maxLength="3"
                value={paymentData.cvv}
                onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-cancel">Cancel</button>
            <button type="submit" className="btn-confirm">Pay ₹{totalAmount}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
