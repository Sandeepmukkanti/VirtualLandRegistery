import React from 'react';
import '../Styles/LegalPages.css';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div>
    <div className="legal-page">
      <h2>Privacy Policy</h2>
      <p>Last Updated: July 2025</p>

      <p>
        At <strong>Virtual Land Registry</strong>, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our decentralized application (dApp).
      </p>

      <h3>1. Information We Collect</h3>
      <ul>
        <li>We do not collect personally identifiable information like name, email, or phone number.</li>
        <li>We collect anonymous usage data to improve our services.</li>
        <li>Authentication is done via <strong>Internet Identity</strong>, and we do not store your identity credentials.</li>
      </ul>

      <h3>2. How We Use Your Information</h3>
      <ul>
        <li>To personalize your dashboard and interactions.</li>
        <li>To monitor platform performance and enhance user experience.</li>
      </ul>

      <h3>3. Data Security</h3>
      <p>Your data is encrypted and stored securely on the Internet Computer Protocol (ICP). We do not share or sell your data to any third parties.</p>

      <h3>4. Changes to This Policy</h3>
      <p>We may update this Privacy Policy occasionally. Continued use of the platform implies your acceptance of any changes.</p>

      <p>For questions, contact us at: <strong>support@virtuallandregistry.com</strong></p>
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
