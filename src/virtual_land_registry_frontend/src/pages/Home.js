import React from 'react';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    if (user) {
      navigate('/register');
    } else {
      navigate('/login?redirect=/register');
    }
  };

  return (
    <div>
      {/* Home Section */}
      <div className="home-container" data-aos="fade-up" data-aos-delay="250">
        <div className="home-subtitle-box">
          <p className="home-subtitle">
            "Own, buy, and sell virtual land — powered by ICP and secured on the blockchain."
          </p>
          <p className="home-mission">
            "Your land, your control — secured with blockchain technology."
          </p>
        </div>

        <button className="cta-button" onClick={handleRegisterClick}>
          ➕ Register Land
        </button>
      </div>

      {/* Why Section */}
      <div className="why-section" data-aos="fade-up" data-aos-delay="300">
        <h2 className="why-heading">Why Choose Virtual Land Registry?</h2>
        <div className="why-cards">
          <div className="why-card">
            <span className="why-icon">✅</span>
            <div>
              <h3>Decentralized Ownership</h3>
              <p>Built on the Internet Computer Protocol (ICP), you truly own your assets.</p>
            </div>
          </div>
          <div className="why-card">
            <span className="why-icon">📄</span>
            <div>
              <h3>Secure Land Registration</h3>
              <p>Register virtual land with cryptographic proof and permanence.</p>
            </div>
          </div>
          <div className="why-card">
            <span className="why-icon">💸</span>
            <div>
              <h3>Easy Trading</h3>
              <p>Seamlessly buy and sell land with trusted smart contracts.</p>
            </div>
          </div>
          <div className="why-card">
            <span className="why-icon">🔍</span>
            <div>
              <h3>Transparent Records</h3>
              <p>View ownership history and land status publicly.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="how-it-works" data-aos="fade-up" data-aos-delay="300">
        <h2 className="how-heading">Own Virtual Land in 3 Simple Steps</h2>
        <div className="steps-container">
          <div className="step">
            <h3>1. Register Your Land</h3>
            <p>Create a permanent record of your virtual property on the blockchain.</p>
          </div>
          <div className="step">
            <h3>2. List or Sell</h3>
            <p>Put your land up for sale securely and transparently.</p>
          </div>
          <div className="step">
            <h3>3. Buy and Own</h3>
            <p>Buy land listed by others and become the verified owner on-chain.</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section" data-aos="stick" data-aos-delay="300">
        <h2 className="features-heading">Platform Highlights</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🔐 Verified Ownership</h3>
            <p>All land records are backed by blockchain — permanent, tamper-proof, and verifiable.</p>
          </div>
          <div className="feature-card">
            <h3>⚡ Instant Transactions</h3>
            <p>Experience near real-time land transfers with secure smart contracts — no delays.</p>
          </div>
          <div className="feature-card">
            <h3>🌍 Global Access</h3>
            <p>Anyone, anywhere can buy or sell virtual land — no borders, no banks.</p>
          </div>
          <div className="feature-card">
            <h3>📊 Transparent History</h3>
            <p>Track ownership and transaction history publicly for every land asset.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer" data-aos="fade-up" data-aos-delay="300">
        <div className="footer-container">
          <div className="footer-brand">
            <h3>Virtual Land Registry</h3>
            <p>
              Enabling trusted virtual land transactions through the power of the Internet
              Computer Protocol (ICP).
            </p>
          </div>

          <div className="footer-links">
            <a href="">Privacy Policy</a>
            <a href="">Terms & Conditions</a>
            <a href="">Support</a>
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
