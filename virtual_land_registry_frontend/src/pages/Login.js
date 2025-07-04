import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import '../Auth.css';
import Dashboard from './Dashboard';
export default function Login() {
  const navigate = useNavigate();
  const { login } = useUser(); // Context login method
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const matchedUser = users.find(
      (user) =>
        user.username === formData.username &&
        user.password === formData.password
    );

    if (matchedUser) {
      login(matchedUser.username); // Only log in if valid
      setError('');
      navigate('/Dashboard'); // Or wherever you redirect post-login
    } else {
      setError('Invalid username or password. Please try again.');
    }
  };
  
  return (
    <div className="login-wrapper">
      <div className="login-form-box">
        <h2 className="login-title">Login</h2>
        <p className="login-subtitle">Access your virtual land account securely.</p>

        {error && <p className="login-error">{error}</p>}

        <form className="login-form" onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit"  >Login</button>
        </form>

        <p className="auth-footer">
          Don't have an account? <a href="/signup">Create one here</a>
        </p>
      </div>
    </div>
  );
}
 