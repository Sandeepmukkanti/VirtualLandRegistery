import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

export default function Navbar() {
  const navigate = useNavigate();

  let user = null;
  let logout = null;

  try {
    const context = useUser();
    if (context) {
      user = context.user;
      logout = context.logout;
    }
  } catch (err) {
    console.error("UserContext Error:", err);
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to Home after logout
  };



  return (
    <nav className="nav">
      <h1>🌍 Virtual Land Registry</h1>
      <ul>
        
        {!user ? (
          <>
          <li><Link to="/">Home</Link></li>
            
            <li><Link to="/login">Login</Link></li>
          </>
        ) : (
          <>
           <li><Link to="/Dashboard">mine</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/buy">Buy</Link></li>
         
           
            <li>
              <button
                onClick={handleLogout}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: 'x-large',
                }}
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
