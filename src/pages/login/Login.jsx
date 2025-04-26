import React from 'react';
import './Login.css';

export default function Login() {
  return (
    <div className="login-page">
      <header className="login-header">
        <span className="logo-text">STOCKVISION</span>
        {/* Replace with actual logo image if available */}
        <div className="logo-icon">📈</div>
      </header>
      <div className="login-container">
        <h1 className="login-title">StockVision</h1>
        <input type="text" placeholder="Login ID" className="input-field full-width" />
        <input type="password" placeholder="Password" className="input-field full-width" />
        <button className="btn btn-primary full-width">Log In</button>
      </div>
    </div>
  );
}