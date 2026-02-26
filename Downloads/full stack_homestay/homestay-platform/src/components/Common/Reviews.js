import React, { useState } from 'react';
import './Reviews.css';

const Reviews = ({ homestayId }) => {
  const [reviews] = useState([
    { id: 1, user: 'Sarah M.', rating: 5, comment: 'Amazing place! Very clean and comfortable.', date: '2024-01-15' },
    { id: 2, user: 'John D.', rating: 4, comment: 'Great location, friendly host.', date: '2024-01-10' }
  ]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  const submitReview = (e) => {
    e.preventDefault();
    alert('Review submitted successfully!');
    setNewReview({ rating: 5, comment: '' });
  };

  return (
    <div className="reviews-section">
      <h3>Reviews</h3>
      <div className="reviews-list">
        {reviews.map(review => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <strong>{review.user}</strong>
              <span className="review-rating">{'⭐'.repeat(review.rating)}</span>
            </div>
            <p>{review.comment}</p>
            <small>{review.date}</small>
          </div>
        ))}
      </div>
      <form onSubmit={submitReview} className="review-form">
        <h4>Write a Review</h4>
        <select value={newReview.rating} onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>
        <textarea
          placeholder="Share your experience..."
          value={newReview.comment}
          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
          required
        />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default Reviews;
