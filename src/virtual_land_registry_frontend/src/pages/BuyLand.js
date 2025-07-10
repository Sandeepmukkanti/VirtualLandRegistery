import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Styles/BuyLand.css';
import { useUser } from '../contexts/UserContext';

import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../declarations/virtual_land_registry_backend/virtual_land_registry_backend.did.js';
import canisterIds from './canister_ids.json';

export default function BuyLand() {
  const [lands, setLands] = useState([]);
  const location = useLocation();
  const { user } = useUser();

  const fetchListedLands = async () => {
    try {
      const agent = new HttpAgent({ host: 'http://localhost:4943' });
      await agent.fetchRootKey();
      const actor = Actor.createActor(idlFactory, {
        agent,
        canisterId: canisterIds.virtual_land_registry_backend.local,
      });

      const all = await actor.get_all_lands();
      const listed = all.filter((land) => land.status === 'Listed');
      setLands(listed);
    } catch (err) {
      console.error('❌ Failed to fetch listed lands:', err);
    }
  };

  useEffect(() => {
    fetchListedLands();
  }, [location]);

  const handleBuy = async (id) => {
    try {
      const agent = new HttpAgent({ host: 'http://localhost:4943' });
      await agent.fetchRootKey();
      const actor = Actor.createActor(idlFactory, {
        agent,
        canisterId: canisterIds.virtual_land_registry_backend.local,
      });

      const success = await actor.transfer_ownership(id, user);
      if (success) {
        alert('✅ Land purchased successfully!');
        fetchListedLands();
      } else {
        alert('❌ Purchase failed. Try again.');
      }
    } catch (err) {
      console.error('❌ Error during purchase:', err);
    }
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
                <p><strong>📅 Registered On:</strong> {land.registration_date}</p>

                <div className="buyland-actions">
                  <Link to={`/land/${land.id}`}>
                    <button className="buyland-button">👁️ View</button>
                  </Link>

                  {land.owner !== user && (
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
