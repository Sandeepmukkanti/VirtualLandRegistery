import React from 'react';
import { AuthClient } from '@dfinity/auth-client';
import '../Styles/Login.css';

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
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">🌐 Virtual Land Registry</h1>
        <p className="login-subtitle">Secure Login with Internet Identity</p>
        <button className="login-button" onClick={handleLogin}>
          🔐 Sign in with Internet Identity
        </button>
      </div>
    </div>
  );
}
