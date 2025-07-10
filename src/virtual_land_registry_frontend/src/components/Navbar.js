import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="nav">
      <h1>🌍 Virtual Land Registry</h1>
      <ul>
        {!user ? (
          <>
            <li><Link className="nav-link" to="/">Home</Link></li>
            <li><Link className="nav-link" to="/login">Login</Link></li>
          </>
        ) : (
          <>
            <li><Link className="nav-link" to="/dashboard">Mine</Link></li>
            <li><Link className="nav-link" to="/register">Register</Link></li>
            <li><Link className="nav-link" to="/buy">Buy</Link></li>
            <li>
              <button className="nav-link logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
