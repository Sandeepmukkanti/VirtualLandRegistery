import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Auth.css';

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if username or email already exists
    const userExists = users.some(
      (user) =>
        user.username === formData.username || user.email === formData.email
    );

    if (userExists) {
      setError('Username or email already exists. Try logging in.');
      return;
    }

    // Add new user and save
    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));

    // Clear error and redirect
    setError('');
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <h2>Create Your Account</h2>

      {error && <p className="login-error">{error}</p>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>

      <p className="auth-footer">
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
}
