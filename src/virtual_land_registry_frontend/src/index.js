import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserProvider } from './contexts/UserContext'; // ✅ Import context provider

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <UserProvider>       {/* ✅ Wrap App inside UserProvider */}
      <App />
    </UserProvider>
  </React.StrictMode>
);
