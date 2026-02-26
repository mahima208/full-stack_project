import React, { useState } from 'react';
import './AdvancedFilter.css';

const AdvancedFilter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    rooms: '',
    rating: '',
    amenities: []
  });

  const amenitiesList = ['WiFi', 'AC', 'Pool', 'Kitchen', 'Parking', 'Garden', 'Fireplace'];

  const toggleAmenity = (amenity) => {
    setFilters({
      ...filters,
      amenities: filters.amenities.includes(amenity)
        ? filters.amenities.filter(a => a !== amenity)
        : [...filters.amenities, amenity]
    });
  };

  const applyFilters = () => {
    onFilter(filters);
  };

  const resetFilters = () => {
    setFilters({ priceMin: '', priceMax: '', rooms: '', rating: '', amenities: [] });
    onFilter({ priceMin: '', priceMax: '', rooms: '', rating: '', amenities: [] });
  };

  return (
    <div className="advanced-filter">
      <h3>Filters</h3>
      <div className="filter-group">
        <label>Price Range</label>
        <div className="price-inputs">
          <input
            type="number"
            placeholder="Min"
            value={filters.priceMin}
            onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.priceMax}
            onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
          />
        </div>
      </div>
      <div className="filter-group">
        <label>Minimum Rooms</label>
        <input
          type="number"
          value={filters.rooms}
          onChange={(e) => setFilters({ ...filters, rooms: e.target.value })}
        />
      </div>
      <div className="filter-group">
        <label>Minimum Rating</label>
        <select value={filters.rating} onChange={(e) => setFilters({ ...filters, rating: e.target.value })}>
          <option value="">Any</option>
          <option value="3">3+ Stars</option>
          <option value="4">4+ Stars</option>
          <option value="4.5">4.5+ Stars</option>
        </select>
      </div>
      <div className="filter-group">
        <label>Amenities</label>
        <div className="amenities-list">
          {amenitiesList.map(amenity => (
            <label key={amenity} className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.amenities.includes(amenity)}
                onChange={() => toggleAmenity(amenity)}
              />
              {amenity}
            </label>
          ))}
        </div>
      </div>
      <div className="filter-actions">
        <button onClick={applyFilters} className="btn-apply">Apply</button>
        <button onClick={resetFilters} className="btn-reset">Reset</button>
      </div>
    </div>
  );
};

export default AdvancedFilter;
