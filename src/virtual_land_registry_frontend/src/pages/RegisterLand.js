import React, { useState, useEffect, useRef } from 'react';
import '../Styles/RegisterLand.css';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

import { HttpAgent, Actor } from '@dfinity/agent';
import { idlFactory } from '../declarations/virtual_land_registry_backend/virtual_land_registry_backend.did.js';
import canisterIds from './canister_ids.json';
import imageCompression from 'browser-image-compression'; // ✅ Import compression lib

export default function RegisterLand() {
  const { user } = useUser();
  const navigate = useNavigate();
  const backendRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    area: '',
    price: '',
    description: '',
    registrationDate: new Date().toISOString().split('T')[0],
    image: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    const initActor = async () => {
      const canisterId = canisterIds.virtual_land_registry_backend.local;
      if (!canisterId) return setError('❌ Backend canister ID missing.');

      try {
        const agent = new HttpAgent({ host: 'http://localhost:4943' });
        await agent.fetchRootKey();
        backendRef.current = Actor.createActor(idlFactory, {
          agent,
          canisterId,
        });
      } catch (err) {
        console.error('❌ Actor init failed:', err);
        setError('❌ Backend connection error.');
      }
    };

    initActor();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      setError('❌ No image selected.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('❌ Only image files allowed.');
      return;
    }

    try {
      console.log('📸 Original size:', file.size / 1024, 'KB');

      // Compress the image
      const options = {
        maxSizeMB: 0.5, // 500KB max
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);
      console.log('✅ Compressed size:', compressedFile.size / 1024, 'KB');

      // Convert to Base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.onerror = () => {
        setError('❌ Failed to read image.');
      };
      reader.readAsDataURL(compressedFile);
    } catch (err) {
      console.error('❌ Compression error:', err);
      setError('❌ Failed to compress image.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { title, location, area, price, description } = formData;
    if (!title || !location || !area || !price || !description)
      return setError('❌ All fields are required.');

    if (!user) return setError('❌ Login required.');

    if (!backendRef.current) return setError('❌ Backend not ready.');

    const land = {
      id: Date.now().toString(),
      title,
      location,
      area,
      price: parseFloat(price),
      description,
      registration_date: formData.registrationDate,
      image: formData.image || '',
      owner: user,
      original_owner: user,
      status: 'Owned',
    };

    try {
      await backendRef.current.register_land(land);
      navigate('/dashboard');
    } catch (err) {
      console.error('❌ Submit failed:', err);
      setError('❌ Failed to register land.');
    }
  };

  return (
    <div>
    <div className="register-land-container">
      <h2 className="form-title">📜 Register New Land</h2>
      <p className="form-subtitle">Fill the details to register your land on ICP.</p>

      {error && <div className="form-error">{error}</div>}

      <form className="register-form" onSubmit={handleSubmit}>
        <label>👤 Owner (Principal ID)</label>
        <input type="text" value={user || ''} disabled />

        <label>📌 Plot Title / Number</label>
        <input name="title" value={formData.title} onChange={handleChange} required />

        <label>🌍 Location</label>
        <input name="location" value={formData.location} onChange={handleChange} required />

        <label>📐 Area (sq. ft.)</label>
        <input name="area" value={formData.area} onChange={handleChange} required type="number" />

        <label>💰 Price (₹)</label>
        <input name="price" value={formData.price} onChange={handleChange} required type="number" />

        <label>📝 Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />

        <label>📅 Registration Date</label>
        <input type="date" name="registrationDate" value={formData.registrationDate} onChange={handleChange} required />

        <label>🖼️ Upload Land Image (Max 500KB after compression)</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />

        {formData.image && (
          <img
            src={formData.image}
            alt="Preview"
            style={{ marginTop: '10px', maxWidth: '200px', borderRadius: '8px' }}
          />
        )}

        <button type="submit" className="register-btn">Submit Land</button>
      </form>
     
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
