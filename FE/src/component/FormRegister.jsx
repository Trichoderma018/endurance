import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Llamados from '../services/Llamados';
import Logo from '../assets/img/Logo.jpeg'; // Usar el mismo logo
import '../style/Register.css';
import Swal from 'sweetalert2';

function FormRegister() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const strengthLabels = ["", "Weak", "Moderate", "Good", "Strong"];
  
  const [formData, setFormData] = useState({
    user: '',
    email: '',
    sede : '',
    password: '',
    confirmPassword: ''
  });

  const evaluatePasswordStrength = (password) => {
    const conditions = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[0-9]/.test(password),
      /[^A-Za-z0-9]/.test(password),
    ];
    return conditions.filter(Boolean).length;
  };

  const passwordStrength =
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword
      ? evaluatePasswordStrength(formData.password)
      : 0;
  
  const strengthLabel = strengthLabels[passwordStrength];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!formData.confirmPassword) {
      setError(null);
    } else {
      setError(formData.password === formData.confirmPassword ? null : 'Passwords do not match.');
    }
  }, [formData.password, formData.confirmPassword]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData.user, formData.sede, formData.email, formData.password, formData.confirmPassword);
    
    if (!formData.user || !formData.sede || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log(formData.sede);
      
      const response = await Llamados.postData({
        username: formData.user,
        password: formData.password,
        password_confirm: formData.confirmPassword,
        sede :formData.sede,
        //user :"juanito24",
        email: formData.email
      }, 'api/users/');


      console.log('User registered successfully:', response);
      console.log(response)

      setTimeout(() => {
        setIsLoading(false);
        Swal.fire({
        title: "Registro Exitoso",
        text: "Se registro correctamente",
        icon: "success",
        });
        navigate('/'); // Redirigir al login
      }, 1500);
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      if (isLoading) {
        setTimeout(() => setIsLoading(false), 5000);
      }
    }
  };

  return (
    <div className='login-container'> {/* Cambiado de 'bn' a 'login-container' */}
      <form className="login-form" onSubmit={handleSubmit}> {/* Cambiado de 'form' a 'login-form' */}
        <img src={Logo} alt="Logo" className="logo" />
        <div className="form-heading">Crear cuenta</div>
        <div className="input-group"> {/* Cambiado de 'input-field' a 'input-group' */}
          <input type="text" id="user" name="user" value={formData.user} onChange={handleChange} required />
          <label htmlFor="user">Nombre completo</label>
        </div>
        <div className="input-group"> {/* Cambiado de 'input-field' a 'input-group' */}
          <input type="text" id="sede" name="sede" value={formData.sede} onChange={handleChange} required />
          <label htmlFor="username">Sede</label>
        </div>
        <div className="input-group">
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          <label htmlFor="email">Correo electrónico</label>
        </div>
        <div className="input-group">
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
          <label htmlFor="password">Contraseña</label>
        </div>
        <div className="input-group">
          <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          <label htmlFor="confirmPassword">Confirmar contraseña</label>
        </div>

        {formData.password &&
          formData.confirmPassword &&
          formData.password === formData.confirmPassword && (
            <div className="password-strength">
              Password Strength: {strengthLabel}
            </div>
          )}

        {error && <p className="error-message">{error}</p>} {/* Cambiado de 'error' a 'error-message' */}

        <button className="submit" type="submit" disabled={isLoading || !!error}>Crear cuenta</button> {/* Cambiado de 'btn' a 'submit' */}
        {isLoading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <span className="loading-text">Cargando</span>
          </div>
        )}
        <div className="signup-link"> {/* Cambiado de 'acc-text' a 'signup-link' */}
          Ya tienes cuenta?{' '}
          <a href="#" onClick={() => navigate('/')}>Iniciar sesión</a>
        </div>
      </form>
    </div>
  );
}

export default FormRegister;