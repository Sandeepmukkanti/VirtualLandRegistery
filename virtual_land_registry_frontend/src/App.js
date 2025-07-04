import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import RegisterLand from './pages/RegisterLand';
import BuyLand from './pages/BuyLand';
import SellLand from './pages/SellLand';
import AOS from 'aos';
import Signup from './pages/Signup';
import 'aos/dist/aos.css';
import Dashboard from './pages/Dashboard';
import ViewLand from './pages/ViewLand';


import { useEffect } from 'react';


function App() {
   useEffect(() => {
    AOS.init({
      duration: 800,   // Animation duration (in ms)
      once: true,      // Whether animation should happen only once
      offset: 100      // Trigger offset
    });
  }, []);
  return (
    
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterLand />} />
        <Route path="/buy" element={<BuyLand />} />
        <Route path="/sell" element={<SellLand />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/land/:id" element={<ViewLand/>} />

      </Routes>
    </Router>
  );
}

export default App;
