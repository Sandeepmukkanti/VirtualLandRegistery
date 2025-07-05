// src/pages/RegisterLand.js
import React, { useState } from 'react';
import '../Styles/RegisterLand.css';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

export default function RegisterLand() {
  const { user } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    area: '',
    price: '',
    description: '',
    registrationDate: new Date().toISOString().split('T')[0],
    image: '', // base64 image
  });

  const [error, setError] = useState('');

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.location || !formData.area || !formData.price) {
      setError('Please fill all required fields.');
      return;
    }

    const newLand = {
      id: Date.now(),
      owner: user,
      originalOwner: user, // ✅ added field
      status: 'Owned',
      ...formData,
    };

    const allLands = JSON.parse(localStorage.getItem('lands')) || [];
    allLands.push(newLand);
    localStorage.setItem('lands', JSON.stringify(allLands));

    navigate('/dashboard');
  };

  return (
    <div className="register-land-container">
      <h2 className="form-title">📜 Register New Land</h2>
      <p className="form-subtitle">Fill the details below to register your property on the ICP blockchain.</p>

      {error && <div className="form-error">{error}</div>}

      <form className="register-form" onSubmit={handleSubmit}>
        <label>👤 Owner</label>
        <input type="text" value={user} disabled />

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

        <label>🖼️ Upload Land Image</label>
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
  );
}
