import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Dashboard.css';

export default function Dashboard() {
  const username = localStorage.getItem('user');

  const [lands, setLands] = useState([
    { id: '12345', location: 'Sector A', status: 'Owned' },
    { id: '67890', location: 'Sector C', status: 'Listed' }
  ]);

  const handleCancel = (id) => {
    const updated = lands.filter(land => land.id !== id);
    setLands(updated);
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Welcome back, {username}! 👋</h2>
      <p className="dashboard-subtitle">Manage your virtual properties on the ICP blockchain.</p>

      <div className="dashboard-summary">
        <div className="summary-card">
          <h3>🏠 {lands.filter(land => land.status === 'Owned').length} Lands Owned</h3>
          <p>Securely registered and managed.</p>
        </div>
        <div className="summary-card">
          <h3>💼 {lands.filter(land => land.status === 'Listed').length} Listed for Sale</h3>
          <p>Actively visible in the marketplace.</p>
        </div>
        <div className="summary-card">
          <h3>🛒 0 Purchases</h3>
          <p>Browse listings and expand your holdings.</p>
        </div>
      </div>

      <div className="dashboard-actions">
        <Link to="/register">
          <button className="dashboard-button">➕ Register New Land</button>
        </Link>
        <Link to="/buy">
          <button className="dashboard-button-secondary">🛍️ Explore Lands for Sale</button>
        </Link>
      </div>

      <div className="dashboard-activity">
        <h3>📜 Recent Activity</h3>
        <ul>
          <li>✅ Registered land #12345 in Sector A</li>
          <li>💼 Listed land #12345 for sale</li>
          <li>❌ Canceled sale for land #56789</li>
        </ul>
      </div>

      {/* ✅ Dynamically render lands */}
      <div className="dashboard-land-table">
        <h3>🗺️ My Lands</h3>
        <table>
          <thead>
            <tr>
              <th>Land ID</th>
              <th>Location</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {lands.map((land) => (
              <tr key={land.id}>
                <td>#{land.id}</td>
                <td>{land.location}</td>
                <td>
                  <span className={`status-badge status-${land.status.toLowerCase()}`}>
                    {land.status}
                  </span>
                </td>
                <td>
                  <Link to={`/land/${land.id}`}>
                    <button className="action-button">View</button>
                  </Link>
                  {land.status === 'Owned' ? (
                    <Link to="/sell">
                      <button className="action-button danger">Sell</button>
                    </Link>
                  ) : (
                    <button
                      className="action-button danger"
                      onClick={() => handleCancel(land.id)}
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
