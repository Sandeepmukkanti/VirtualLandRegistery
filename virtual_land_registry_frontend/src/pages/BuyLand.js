import React from 'react';

const sampleLands = [
  { id: 1, owner: 'Alice', location: 'Meta Valley', area: 500 },
  { id: 2, owner: 'Bob', location: 'VR Heights', area: 300 }
];

export default function BuyLand() {
  return (
    <div className="page">
      <h2>Available Lands for Purchase</h2>
      <ul>
        {sampleLands.map(land => (
          <li key={land.id}>
            <strong>{land.location}</strong> – {land.area} sq.m (Owner: {land.owner})
            <button style={{ marginLeft: '10px' }}>Buy</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
