import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../Styles/Dashboard.css';

export default function Dashboard() {
  const username = localStorage.getItem('user');
  const [lands, setLands] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Load lands owned by current user
  useEffect(() => {
    const allLands = JSON.parse(localStorage.getItem('lands')) || [];
    const myLands = allLands.filter((land) => land.owner === username);
    setLands(myLands);
  }, [location, username]);

  // Cancel selling a land (set back to 'Owned')
  const handleCancel = (id) => {
    const updatedLands = lands.map((land) =>
      land.id === id ? { ...land, status: 'Owned' } : land
    );
    setLands(updatedLands);

    const allLands = JSON.parse(localStorage.getItem('lands')) || [];
    const updatedAll = allLands.map((land) =>
      land.id === id ? { ...land, status: 'Owned' } : land
    );
    localStorage.setItem('lands', JSON.stringify(updatedAll));
  };

  // Mark land as Listed for sale
  const handleSell = (id) => {
    const updatedLands = lands.map((land) =>
      land.id === id ? { ...land, status: 'Listed' } : land
    );
    setLands(updatedLands);

    const allLands = JSON.parse(localStorage.getItem('lands')) || [];
    const updatedAll = allLands.map((land) =>
      land.id === id ? { ...land, status: 'Listed' } : land
    );
    localStorage.setItem('lands', JSON.stringify(updatedAll));
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Welcome back, {username}! 👋</h2>
      <p className="dashboard-subtitle">Manage your virtual properties on the ICP blockchain.</p>

      <div className="dashboard-summary">
        <div className="summary-card">
          <h3>🏠 {lands.filter((land) => land.status === 'Owned').length} Lands Owned</h3>
          <p>Securely registered and managed.</p>
        </div>
        <div className="summary-card">
          <h3>💼 {lands.filter((land) => land.status === 'Listed').length} Listed for Sale</h3>
          <p>Actively visible in the marketplace.</p>
        </div>
        <div className="summary-card">
          <h3>
            🛒 {
              lands.filter(
                (land) =>
                  land.status === 'Owned' &&
                  land.originalOwner &&
                  land.originalOwner !== username
              ).length
            } Purchases
          </h3>
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

      <div className="dashboard-land-table">
        <h3>🗺️ My Lands</h3>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Land ID</th>
              <th>Location</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {lands.map((land) => (
              <tr key={land.id}>
                <td>
                  {land.image ? (
                    <img
                      src={land.image}
                      alt="Land"
                      style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '6px' }}
                    />
                  ) : (
                    'No Image'
                  )}
                </td>
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
                    <button className="action-button danger" onClick={() => handleSell(land.id)}>
                      Sell
                    </button>
                  ) : (
                    <button className="action-button danger" onClick={() => handleCancel(land.id)}>
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
