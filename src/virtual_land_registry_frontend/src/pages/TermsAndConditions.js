import React from 'react';
import { Link } from 'react-router-dom';

import '../Styles/LegalPages.css';
export default function TermsAndConditions() {
  return (
    <div>
    <div className="legal-page">
      <h2>Terms & Conditions</h2>
      <p>Last Updated: July 2025</p>

      <h3>1. Acceptance of Terms</h3>
      <p>By using the Virtual Land Registry dApp, you agree to abide by these Terms and Conditions.</p>

      <h3>2. Platform Description</h3>
      <p>This platform allows users to register, manage, and transfer virtual land ownership on the Internet Computer blockchain.</p>

      <h3>3. User Responsibilities</h3>
      <ul>
        <li>You must use a valid Internet Identity for authentication.</li>
        <li>You agree not to misuse or tamper with the smart contracts.</li>
        <li>You are responsible for ensuring the accuracy of the data you submit.</li>
      </ul>

      <h3>4. Intellectual Property</h3>
      <p>All content, designs, and code on this platform are property of Virtual Land Registry. Unauthorized use is prohibited.</p>

      <h3>5. Limitation of Liability</h3>
      <p>We are not responsible for losses due to smart contract failures, blockchain issues, or user errors.</p>

      <h3>6. Modifications</h3>
      <p>We reserve the right to modify these Terms at any time. Continued use constitutes acceptance of the new Terms.</p>

      <p>For legal concerns, contact us at: <strong>legal@virtuallandregistry.com</strong></p>
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
