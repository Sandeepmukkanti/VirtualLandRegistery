import React from 'react';
import { AuthClient } from '@dfinity/auth-client';
import '../Styles/Login.css';
import { Link } from 'react-router-dom';
export default function Login() {
  const handleLogin = async () => {
    const authClient = await AuthClient.create();
    await authClient.login({
      identityProvider: 'https://identity.ic0.app/#authorize',
      onSuccess: () => {
        window.location.href = '/dashboard';
      },
    });
  };

  return (
    <div>
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">🌐 Virtual Land Registry</h1>
        <p className="login-subtitle">Secure Login with Internet Identity</p>
        <button className="login-button" onClick={handleLogin}>
          🔐 Sign in with Internet Identity
        </button>
      </div>
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
             <Link to="/privacy">Privacy Policy</Link>
  <Link to="/terms">Terms & Conditions</Link>
  <Link to="/support">Support</Link>
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
