import React, { useState, useEffect, useRef } from 'react';
import '../Styles/RegisterLand.css';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { HttpAgent, Actor } from '@dfinity/agent';
import { idlFactory } from '../declarations/virtual_land_registry_backend/virtual_land_registry_backend.did.js';
import canisterIds from './canister_ids.json';
import imageCompression from 'browser-image-compression';
import { Link } from 'react-router-dom';
export default function RegisterLand() {
  const { user } = useUser();
  const navigate = useNavigate();
  const backendRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    area: '',
    price: '',
    description: '',
    registrationDate: new Date().toISOString().split('T')[0],
    image: '',
    pdf: '',
  });

  const [error, setError] = useState('');
  const [uploadingPdf, setUploadingPdf] = useState(false);

  useEffect(() => {
    const initActor = async () => {
      const canisterId = canisterIds.virtual_land_registry_backend.local;
      try {
        const agent = new HttpAgent({ host: 'http://localhost:4943' });
        await agent.fetchRootKey();
        backendRef.current = Actor.createActor(idlFactory, {
          agent,
          canisterId,
        });
      } catch (err) {
        setError('❌ Failed to connect to backend.');
      }
    };
    initActor();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) {
      setError('❌ Only image files allowed.');
      return;
    }

    try {
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(compressedFile);
    } catch (err) {
      setError('❌ Image compression failed.');
    }
  };

  const handlePdfUpload = async (e) => {
  const file = e.target.files[0];
  if (!file || file.type !== 'application/pdf') {
    setError('❌ Only PDF files allowed.');
    return;
  }

  try {
    setUploadingPdf(true);
    const formDataToSend = new FormData();
    formDataToSend.append("file", file);

    // ✅ Correct way to access .env variable
    const jwt ="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiYTM2YjhhZS00NGUwLTQ0YjMtOTEzMS05MWRlZTJlZTA4ZDciLCJlbWFpbCI6Im11a2thbnRpc2FuZGVlcDEwNUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMDc0YTZiMzE3NzU4YzU4MDMxZjMiLCJzY29wZWRLZXlTZWNyZXQiOiI0OTRmYWM1NTI1ZWE1MTE4NWViN2I2MTc5YjAxZDdhZGYyYjI1NGY2MjM1NmE4ZDk2ZWMwNGQ2NzJjYzcwNmRkIiwiZXhwIjoxNzgzNzYxODk0fQ.7VUrphNL8LBwDveRmKeW53lx8S2E9UtWkjMigAgMpi4"
    console.log("JWT DEBUG:", jwt);
    if (!jwt) {
      setError('❌ JWT missing. Check your .env file.');
      return;
    }

    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: jwt,
      },
      body: formDataToSend,
    });

    if (!res.ok) {
      const errorResponse = await res.json();
      console.error("Pinata Upload Error:", errorResponse);
      throw new Error("Upload failed");
    }

    const data = await res.json();
    const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;

    setFormData((prev) => ({ ...prev, pdf: ipfsUrl }));
    setError('');
  } catch (err) {
    console.error("❌ PDF Upload Error:", err);
    setError("❌ PDF upload failed.");
  } finally {
    setUploadingPdf(false);
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { title, location, area, price, description, pdf } = formData;

    console.log("📄 PDF:", pdf); // Debug

    if (!title || !location || !area || !price || !description || !pdf) {
      return setError('❌ All fields including PDF are required.');
    }

    if (!backendRef.current) return setError('❌ Backend not ready.');

    const land = {
      id: Date.now().toString(),
      title,
      location,
      area,
      price: parseFloat(price),
      description,
      registration_date: formData.registrationDate,
      image: formData.image || '',
  pdf: formData.pdf || '', // ✅ ADD THIS LINE
      owner: user,
      original_owner: user,
      status: 'Owned',
    };

    try {
      await backendRef.current.register_land(land);
      navigate('/dashboard');
    } catch (err) {
      console.error('❌ Backend error:', err);
      setError('❌ Failed to register land.');
    }
  };

  return (
    <div>
    <div className="register-land-container">
      <h2 className="form-title">📜 Register New Land</h2>
      <p className="form-subtitle">Fill in the details and attach your land documents.</p>

      {error && <div className="form-error">{error}</div>}

      <form className="register-form" onSubmit={handleSubmit}>
        <label>👤 Owner (Principal ID)</label>
        <input type="text" value={user || ''} disabled />

        <label>📌 Plot Title / Number</label>
        <input name="title" value={formData.title} onChange={handleChange} required />

        <label>🌍 Location</label>
        <input name="location" value={formData.location} onChange={handleChange} required />

        <label>📐 Area (sq. ft.)</label>
        <input name="area" value={formData.area} onChange={handleChange} required type="number" />

        <label>💰 Price (₹)</label>
        <input name="price" value={formData.price} onChange={handleChange} required type="number" />

        <label>📝 Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />

        <label>📅 Registration Date</label>
        <input type="date" name="registrationDate" value={formData.registrationDate} onChange={handleChange} required />

        <label>🖼️ Upload Land Image (Max 500KB)</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {formData.image && (
          <img
            src={formData.image}
            alt="Preview"
            style={{ marginTop: '10px', maxWidth: '200px', borderRadius: '8px' }}
          />
        )}

        <label>📄 Upload PDF Document (e.g., Ownership Proof)</label>
        <input type="file" accept="application/pdf" onChange={handlePdfUpload} />
        {formData.pdf && (
          <p style={{ marginTop: '10px' }}>
            ✅ PDF uploaded: <a href={formData.pdf} target="_blank" rel="noreferrer">View Document</a>
          </p>
        )}
        {uploadingPdf && <p style={{ color: 'blue' }}>⏳ Uploading PDF...</p>}
        

        <button
          type="submit"
          className="register-btn"
          disabled={!formData.pdf || uploadingPdf}
        >
          Submit Land
        </button>
      </form>
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
