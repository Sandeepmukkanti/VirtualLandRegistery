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
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newLand = {
      id: Date.now(),
      owner: user,
      ...formData,
    };

    const allLands = JSON.parse(localStorage.getItem('lands')) || [];
    allLands.push(newLand);
    localStorage.setItem('lands', JSON.stringify(allLands));

    navigate('/buy');
  };

  return (
    <div className="register-land-container">
      <h2>📜 Register New Land</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label>Owner</label>
        <input type="text" value={user} disabled />

        <label>Plot Title / Number</label>
        <input name="title" value={formData.title} onChange={handleChange} required />

        <label>Location</label>
        <input name="location" value={formData.location} onChange={handleChange} required />

        <label>Area (sq. ft.)</label>
        <input name="area" value={formData.area} onChange={handleChange} required type="number" />

        <label>Price (₹)</label>
        <input name="price" value={formData.price} onChange={handleChange} required type="number" />

        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />

        <label>Registration Date</label>
        <input type="date" name="registrationDate" value={formData.registrationDate} onChange={handleChange} required />

        <button type="submit">Register Land</button>
      </form>
    </div>
  );
}
