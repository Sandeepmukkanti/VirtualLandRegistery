import React from 'react';
import { useParams } from 'react-router-dom';
import '../Styles/ViewLand.css';

export default function ViewLand() {
  const { id } = useParams();

  // Placeholder for multiple land data in the future
  const lands = [
    {
      id: id,
      location: 'Sector A',
      status: 'Owned',
      registeredOn: '20th June 2025',
      owner: localStorage.getItem('user'),
    },
     
    // You can add more land objects here
  ];

  return (
    <div className="viewland-wrapper">
      <h2 className="viewland-page-title">📍 Land Details</h2>

      <div className="viewland-grid">
        {lands.map((land, index) => (
          <div className="viewland-card glass-card" key={index}>
            <h3 className="viewland-title">Land #{land.id}</h3>
            <p><strong>Location:</strong> {land.location}</p>
            <p><strong>Status:</strong> <span className={`status-badge ${land.status.toLowerCase()}`}>{land.status}</span></p>
            <p><strong>Registered On:</strong> {land.registeredOn}</p>
            <p><strong>Owner:</strong> {land.owner}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
