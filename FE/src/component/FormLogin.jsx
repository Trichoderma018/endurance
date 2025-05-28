import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../style/login.css";
import "../assets/img/Logo.jpeg";

const FormLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');

    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login Details:', { email, password });

    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    navigate('/Expesiente'); // Redirect to the expediente page
  };

  return (

   <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <img className='' src="..\src\assets\img\Logo.jpeg" alt="logo" />
      

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>

        <button className="submit" type="submit">Log In</button>

        <div className="signup-link" onClick={() => navigate('/register')}>
          Don't have an account? <a href="#">Sign up</a>
        </div>
      </form>
    </div>
  );
};

export default FormLogin;