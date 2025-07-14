import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="nav">
      <div className="nav-brand">
        <h1>🌍 Virtual Land Registry</h1>
        <div className="menu-toggle" onClick={toggleMenu}>
          &#9776;
        </div>
      </div>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
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
