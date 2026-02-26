import React, { useState, useEffect } from 'react';
import GuideStorage from '../../utils/GuideStorage';
import './GuideBooking.css';

const GuideBooking = ({ user }) => {
  const [guides, setGuides] = useState([]);
  const [filteredGuides, setFilteredGuides] = useState([]);
  const [locationFilter, setLocationFilter] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('');
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    startDate: '',
    endDate: '',
    requirements: ''
  });

  useEffect(() => {
    const allGuides = GuideStorage.getAvailableGuides();
    setGuides(allGuides);
    setFilteredGuides(allGuides);
  }, []);

  const handleFilter = () => {
    let filtered = guides;
    
    if (locationFilter) {
      filtered = filtered.filter(guide => 
        guide.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }
    
    if (specializationFilter) {
      filtered = filtered.filter(guide =>
        guide.specialization.some(spec => 
          spec.toLowerCase().includes(specializationFilter.toLowerCase())
        )
      );
    }
    
    setFilteredGuides(filtered);
  };

  const handleBooking = (e) => {
    e.preventDefault();
    
    if (!bookingDetails.startDate || !bookingDetails.endDate) {
      alert('Please select start and end dates');
      return;
    }

    const booking = {
      guideId: selectedGuide.id,
      guideName: selectedGuide.name,
      guideEmail: selectedGuide.email,
      touristEmail: user.email,
      touristName: user.username,
      ...bookingDetails,
      totalPrice: calculateTotalPrice()
    };

    GuideStorage.bookGuide(booking);
    alert('Guide booking request submitted successfully!');
    setSelectedGuide(null);
    setBookingDetails({ startDate: '', endDate: '', requirements: '' });
  };

  const calculateTotalPrice = () => {
    if (!bookingDetails.startDate || !bookingDetails.endDate) return 0;
    const start = new Date(bookingDetails.startDate);
    const end = new Date(bookingDetails.endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    return days * selectedGuide.pricePerDay;
  };

  return (
    <div className="guide-booking">
      <h2>Book a Local Guide</h2>
      
      <div className="filter-section">
        <input
          type="text"
          placeholder="Filter by location..."
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by specialization..."
          value={specializationFilter}
          onChange={(e) => setSpecializationFilter(e.target.value)}
        />
        <button onClick={handleFilter}>Apply Filters</button>
        <button onClick={() => {
          setLocationFilter('');
          setSpecializationFilter('');
          setFilteredGuides(guides);
        }}>Clear</button>
      </div>

      <div className="guides-grid">
        {filteredGuides.map(guide => (
          <div key={guide.id} className="guide-card">
            <div className="guide-header">
              <h3>{guide.name}</h3>
              <span className="rating">⭐ {guide.rating}</span>
            </div>
            <p className="location">📍 {guide.location}</p>
            <p className="experience">{guide.experience} years experience</p>
            <p className="description">{guide.description}</p>
            
            <div className="guide-details">
              <div className="languages">
                <strong>Languages:</strong> {guide.languages.join(', ')}
              </div>
              <div className="specialization">
                <strong>Specialization:</strong>
                <div className="tags">
                  {guide.specialization.map((spec, idx) => (
                    <span key={idx} className="tag">{spec}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="guide-footer">
              <span className="price">₹{guide.pricePerDay}/day</span>
              <button onClick={() => setSelectedGuide(guide)}>Book Now</button>
            </div>
          </div>
        ))}
      </div>

      {filteredGuides.length === 0 && (
        <p className="no-results">No guides found matching your criteria.</p>
      )}

      {selectedGuide && (
        <div className="booking-modal">
          <div className="modal-content">
            <h3>Book {selectedGuide.name}</h3>
            <form onSubmit={handleBooking}>
              <div className="form-group">
                <label>Start Date:</label>
                <input
                  type="date"
                  value={bookingDetails.startDate}
                  onChange={(e) => setBookingDetails({...bookingDetails, startDate: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>End Date:</label>
                <input
                  type="date"
                  value={bookingDetails.endDate}
                  onChange={(e) => setBookingDetails({...bookingDetails, endDate: e.target.value})}
                  min={bookingDetails.startDate || new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Special Requirements:</label>
                <textarea
                  value={bookingDetails.requirements}
                  onChange={(e) => setBookingDetails({...bookingDetails, requirements: e.target.value})}
                  placeholder="Any specific requirements or preferences..."
                  rows="3"
                />
              </div>
              
              {bookingDetails.startDate && bookingDetails.endDate && (
                <div className="total-price">
                  <strong>Total Price: ₹{calculateTotalPrice()}</strong>
                </div>
              )}
              
              <div className="modal-actions">
                <button type="submit">Confirm Booking</button>
                <button type="button" onClick={() => setSelectedGuide(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuideBooking;
