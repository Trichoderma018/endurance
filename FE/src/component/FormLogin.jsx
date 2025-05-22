import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../style/login.css";

function FormLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login Details:', { email, password });
  };

  return (

  
    <div>
      <form className="login-form" onSubmit={handleSubmit}> {/* Attach onSubmit here */}
        <div className="form-heading">Login</div>
        <div className="input-group">
          <label className="label" htmlFor="email">Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </div>
        <div className="input-group">
          <label className="label" htmlFor="password">Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
        </div>
        <div className="forgot-password"></div>
        <button className="submit" type="submit" onClick={() => navigate('/principal')}>Log In</button>
        <div className="signup-link" onClick={() => navigate('/register')}>
          Don't have an account? <a href="#">Sign up</a>
        </div>
      </form>
      <div className="image-container">
      </div>
    </div>
  );
}

export default FormLogin;