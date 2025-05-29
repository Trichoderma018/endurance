import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../style/login.css";
import "../assets/img/Logo.jpeg";
import Llamados from '../services/Llamados';

const FormLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Llamados.postData({
        username: username,
        password: password
      }, 'api/token');

      console.log('Response Data', response);
      if (!response.token) {
        navigate('/Expesiente'); // Redirige a Expediente
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (

   <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <img className='' src="..\src\assets\img\Logo.jpeg" alt="logo" />
      

        <div className="input-group">
          <div className='rtflx'>
          <label className='rtflx' htmlFor="email">Username</label>
          <input 
            className='rtflx'
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          /></div>
        </div>

        <div className="input-group">
          <div className='rtflx'>
          <label className='rtflx' htmlFor="password">Password</label>
          <input 
            className='rtflx'
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          /></div>
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