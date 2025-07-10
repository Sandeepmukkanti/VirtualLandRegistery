import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Styles/Dashboard.css';
import { useUser } from '../contexts/UserContext';

import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../declarations/virtual_land_registry_backend/virtual_land_registry_backend.did.js';
import canisterIds from './canister_ids.json';

export default function Dashboard() {
  const { user } = useUser();
  const [lands, setLands] = useState([]);
  const location = useLocation();

  const fetchLands = async () => {
    try {
      const agent = new HttpAgent({ host: 'http://localhost:4943' });
      await agent.fetchRootKey(); // Only for local dev
      const actor = Actor.createActor(idlFactory, {
        agent,
        canisterId: canisterIds.virtual_land_registry_backend.local,
      });

      const allLands = await actor.get_all_lands();
      const myLands = allLands.filter((land) => land.owner.toString() === user.toString());
      setLands(myLands);
    } catch (error) {
      console.error('❌ Failed to fetch lands:', error);
    }
  };

  useEffect(() => {
    if (user) fetchLands();
  }, [location, user]);

  const updateStatus = async (id, newStatus) => {
    try {
      const agent = new HttpAgent({ host: 'http://localhost:4943' });
      await agent.fetchRootKey();
      const actor = Actor.createActor(idlFactory, {
        agent,
        canisterId: canisterIds.virtual_land_registry_backend.local,
      });

      const success = await actor.update_land_status(id, newStatus);
      if (success) fetchLands();
    } catch (err) {
      console.error('❌ Failed to update status:', err);
    }
  };

  const deleteLand = async (id) => {
    try {
      const agent = new HttpAgent({ host: 'http://localhost:4943' });
      await agent.fetchRootKey();
      const actor = Actor.createActor(idlFactory, {
        agent,
        canisterId: canisterIds.virtual_land_registry_backend.local,
      });

      const success = await actor.delete_land(id);
      if (success) fetchLands();
    } catch (err) {
      console.error('❌ Failed to delete land:', err);
    }
  };

  const shortUser = user ? `...${user.slice(-6)}` : '';

  return (
    <div>
    <div className="dashboard-container">
      <h2 className="dashboard-title">Welcome back, {shortUser}! 👋</h2>
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
                  land.original_owner &&
                  land.original_owner !== user
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
              <th>Actions</th>
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
                      style={{
                        width: '100px',
                        height: '60px',
                        objectFit: 'cover',
                        borderRadius: '6px',
                      }}
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
                    <button
                      className="action-button danger"
                      onClick={() => updateStatus(land.id, 'Listed')}
                    >
                      Sell
                    </button>
                  ) : (
                    <button
                      className="action-button danger"
                      onClick={() => updateStatus(land.id, 'Owned')}
                    >
                      Cancel
                    </button>
                  )}

                  <button
                    className="action-button delete"
                    style={{ backgroundColor: 'red', color: 'white', marginLeft: '6px' }}
                    onClick={() => deleteLand(land.id)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    
    </div>
         {/* Footer */}
      <footer className="footer" data-aos="stick" data-aos-delay="300">
        <div className="footer-container">
          <div className="footer-brand">
            <h3>Virtual Land Registry</h3>
            <p>
              Enabling trusted virtual land transactions through the power of the Internet
              Computer Protocol (ICP).
            </p>
          </div>

          <div className="footer-links">
            <a href="">Privacy Policy</a>
            <a href="">Terms & Conditions</a>
            <a href="">Support</a>
          </div>

          <p className="footer-copy">
            &copy; {new Date().getFullYear()} Virtual Land Registry. Built for the decentralized
            future.
          </p>
        </div>
      </footer>
    </div>
  );
}
