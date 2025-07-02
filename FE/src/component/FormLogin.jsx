import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../style/login.css";
import Llamados from '../services/Llamados';
import Logo from '../assets/img/Logo.jpeg'; // Importar imagen correctamente

const FormLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await Llamados.postData({ username, password }, 'api/token');
      console.log(response);

      if (response.access) {
        localStorage.setItem('token', response.token); // Guardar el token en almacenamiento local
       navigate('/Expediente'); // Redirigir a Expediente
      } else {
        setError('Credenciales incorrectas, inténtalo de nuevo.');
      }
    } catch (error) {
      setError('Error de conexión, por favor intenta más tarde.');
      console.error('Error during login:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <img className="logo" src={Logo} alt="Logo" />

        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username"
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button className="submit" type="submit" disabled={loading}>
          {loading ? "loading..." : "Log In"}
        </button>

        <div className="signup-link" onClick={() => navigate('/register')}>
          Don't have an account? <a href="#">Sign up</a>
        </div>
      </form>
    </div>
  );
};

export default FormLogin;