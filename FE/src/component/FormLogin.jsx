import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../style/login.css";

function FormLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Inicializar el hook de navegación

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login Details:', { email, password });
    // Aquí podrías agregar lógica para autenticación
  };

  return (
    <div>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-heading">Login</div>
        <div className="input-group">
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      
        <button className="submit" type="submit">
          Log In
        </button>
        <div className="signup-link">
          Don't have an account? 
          <button className='logi' onClick={() => navigate('/register')}>Sign up</button>
        </div>
      </form>
    </div>
  );
}

export default FormLogin;