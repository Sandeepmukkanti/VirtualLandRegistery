import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Styles/BuyLand.css';

export default function BuyLand() {
  const [lands, setLands] = useState([]);
  const location = useLocation();
  const currentUser = localStorage.getItem('user');

  useEffect(() => {
    const allLands = JSON.parse(localStorage.getItem('lands')) || [];
    const listedLands = allLands.filter((land) => land.status === 'Listed');
    setLands(listedLands);
  }, [location]);

  const handleBuy = (id) => {
    const allLands = JSON.parse(localStorage.getItem('lands')) || [];

    const updatedLands = allLands.map((land) => {
      if (land.id === id && land.status === 'Listed') {
        return {
          ...land,
          owner: currentUser,
          status: 'Owned',
          originalOwner: land.originalOwner || land.owner, // track who listed it
        };
      }
      return land;
    });

    localStorage.setItem('lands', JSON.stringify(updatedLands));

    const newListed = updatedLands.filter((land) => land.status === 'Listed');
    setLands(newListed);

    alert('✅ Land purchased successfully! Ownership transferred.');
  };

  return (
    <div className="buyland-container">
      <h2 className="buyland-title">🛒 Lands Available for Sale</h2>
      {lands.length === 0 ? (
        <p className="buyland-empty">No lands are listed for sale yet.</p>
      ) : (
        <div className="buyland-grid">
          {lands.map((land) => (
            <div className="buyland-card" key={land.id}>
              <div className="buyland-card-content">
                <h3>{land.title}</h3>
                <p><strong>📍 Location:</strong> {land.location}</p>
                <p><strong>📐 Area:</strong> {land.area} sq.ft</p>
                <p><strong>💰 Price:</strong> ₹{land.price}</p>
                <p><strong>🧑 Owner:</strong> {land.owner}</p>
                <p><strong>📝 Description:</strong> {land.description}</p>
                <p><strong>📅 Registered On:</strong> {land.registrationDate}</p>
                <div className="buyland-actions">
                  <Link to={`/land/${land.id}`}>
                    <button className="buyland-button">👁️ View</button>
                  </Link>
                  {land.owner !== currentUser && (
                    <button
                      className="buyland-button-primary"
                      onClick={() => handleBuy(land.id)}
                    >
                      💸 Buy
                    </button>
                  )}
                </div>
              </div>
              <div className="buyland-card-image">
                {land.image ? (
                  <img
                    src={land.image}
                    alt="Land"
                    style={{
                      maxWidth: '220px',
                      maxHeight: '140px',
                      borderRadius: '8px',
                      objectFit: 'cover',
                      marginLeft: '10px'
                    }}
                  />
                ) : (
                  <p>No Image</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
