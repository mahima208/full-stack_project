import React, { useState } from 'react';
import '../Admin/ManageUsers.css';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([
    { id: 1, name: 'Cozy Villa', location: 'Goa', price: 2500, rating: 4.5 },
    { id: 2, name: 'Mountain Retreat', location: 'Manali', price: 2000, rating: 4.3 }
  ]);

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  return (
    <div className="manage-section">
      <h2>My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
          {wishlist.map(item => (
            <div key={item.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', background: 'white' }}>
              <h3>{item.name}</h3>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Price:</strong> ₹{item.price}/night</p>
              <p><strong>Rating:</strong> ⭐ {item.rating}</p>
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="delete"
                style={{ width: '100%', marginTop: '10px' }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
