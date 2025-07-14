import React from 'react';
import '../Styles/LegalPages.css'; // ✅ Make sure this is imported
import { Link } from 'react-router-dom';

export default function Support() {
  return (
    <div>
    <div className="legal-page">
      <h2>Support</h2>
      <p>If you need any help or have questions about the Virtual Land Registry platform, feel free to contact us using the information below.</p>

      <h3>📧 Email</h3>
      <p>support@vlandregistry.com</p>

      <h3>📍 Address</h3>
      <p>Virtual Land Registry HQ, vijayawada,Andhra pradesh, India</p>
    </div>


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
