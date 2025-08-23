import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/login.css';
import Llamados from '../services/Llamados';
import Logo from '../assets/img/Logo.jpeg';
import ResetPassword from './ResetPassword';

const FormLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await Llamados.postData({ username, password }, 'api/token');
      console.log(response);

      if (response.access) {
        localStorage.setItem('token', response.token);
        navigate('/Expediente');
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
          <label htmlFor="username">Nombre</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Contraseña</label>
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
          {loading ? 'Cargando...' : 'Iniciar Sesión'}
        </button>
        <div className="forgot-password">
          <a href="#" onClick={openModal}>¿Olvidaste tu contraseña?</a>
        </div>
        <div className="signup-link" onClick={() => navigate('/register')}>
          ¿No tienes cuenta? <a href="#">Iniciar sesión</a>
        </div>
      </form>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <button className="modal-close" onClick={closeModal}>
              ✖
            </button>
            <ResetPassword onClose={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FormLogin;