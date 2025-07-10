import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../Styles/ViewLand.css';

import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../declarations/virtual_land_registry_backend/virtual_land_registry_backend.did.js';
import canisterIds from './canister_ids.json';

export default function ViewLand() {
  const { id } = useParams();
  const [land, setLand] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLand = async () => {
      try {
        const agent = new HttpAgent({ host: 'http://localhost:4943' });
        await agent.fetchRootKey(); // Only in local development

        const actor = Actor.createActor(idlFactory, {
          agent,
          canisterId: canisterIds.virtual_land_registry_backend.local,
        });

        const result = await actor.get_land_by_id(id);
        if (result.length > 0) {
          setLand(result[0]);
        } else {
          setError('❌ Land not found!');
        }
      } catch (err) {
        console.error('Error fetching land:', err);
        setError('❌ Failed to fetch land data.');
      }
    };

    fetchLand();
  }, [id]);

  if (error) {
    return <div className="viewland-error">{error}</div>;
  }

  if (!land) {
    return <div className="viewland-loading">Loading land details...</div>;
  }

  return (
    <div className="viewland-wrapper">
      <h2 className="viewland-page-title">📍 Land Details</h2>
      <div className="viewland-grid">
        <div className="viewland-card glass-card">
          <h3 className="viewland-title">Land #{land.id}</h3>
          <p><strong>📌 Title:</strong> {land.title}</p>
          <p><strong>🌍 Location:</strong> {land.location}</p>
          <p><strong>📐 Area:</strong> {land.area} sq.ft</p>
          <p><strong>💰 Price:</strong> ₹{land.price}</p>
          <p><strong>📝 Description:</strong> {land.description}</p>
          <p><strong>📅 Registered On:</strong> {land.registration_date}</p>
          <p><strong>🧑 Owner:</strong> {land.owner}</p>
          <p><strong>🧾 Original Owner:</strong> {land.original_owner}</p>
          <p><strong>Status:</strong> <span className={`status-badge ${land.status.toLowerCase()}`}>{land.status}</span></p>

          {land.image && (
            <img
              src={land.image}
              alt="Land"
              style={{ marginTop: '10px', maxWidth: '300px', borderRadius: '10px' }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
