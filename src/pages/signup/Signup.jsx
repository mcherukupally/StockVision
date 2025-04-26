import React from 'react';
import './Signup.css';

export default function Signup() {
  return (
    <div className="signup-page">
      <header className="signup-header">STOCKVISION</header>
      <div className="signup-container">
        <h1 className="signup-title">Welcome to StockVision</h1>
        <div className="name-fields">
          <input type="text" placeholder="First Name" className="input-field" />
          <input type="text" placeholder="Last Name" className="input-field" />
        </div>
        <input type="email" placeholder="Email" className="input-field full-width" />
        <input type="password" placeholder="Password" className="input-field full-width" />
        <input type="tel" placeholder="Phone Number" className="input-field full-width" />
        <div className="button-group">
          <button className="btn btn-social">Sign up with Google</button>
          <button className="btn btn-primary">Create Account</button>
          <button className="btn btn-social">Sign up with Apple</button>
        </div>
        <div className="login-link">
          Already have an account? <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
}