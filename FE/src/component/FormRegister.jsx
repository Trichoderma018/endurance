import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Llamados from '../services/Llamados';
import Logo from '../assets/img/Logo.jpeg'; // Usar el mismo logo
import '../style/Register.css';

function FormRegister() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const strengthLabels = ["", "Weak", "Moderate", "Good", "Strong"];
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

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

  const evaluatePasswordStrength = (password) => {
    const conditions = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[0-9]/.test(password),
      /[^A-Za-z0-9]/.test(password),
    ];
    return conditions.filter(Boolean).length;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await Llamados.postData({
        password: formData.password,
        password_confirm: formData.confirmPassword,
        username: formData.username,
        email: formData.email
      }, 'api/users/');

      console.log('User registered successfully:', response);

      setTimeout(() => {
        setIsLoading(false);
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
        <div className="form-heading">Sign Up</div>
        <div className="input-group"> {/* Cambiado de 'input-field' a 'input-group' */}
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
          <label htmlFor="username">Full Name</label>
        </div>
        <div className="input-group">
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          <label htmlFor="email">Email</label>
        </div>
        <div className="input-group">
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
          <label htmlFor="password">Password</label>
        </div>
        <div className="input-group">
          <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          <label htmlFor="confirmPassword">Confirm Password</label>
        </div>

        {formData.password &&
          formData.confirmPassword &&
          formData.password === formData.confirmPassword && (
            <div className="password-strength">
              Password Strength: {strengthLabel}
            </div>
          )}

        {error && <p className="error-message">{error}</p>} {/* Cambiado de 'error' a 'error-message' */}

        <button className="submit" type="submit" disabled={isLoading || !!error}>Sign Up</button> {/* Cambiado de 'btn' a 'submit' */}
        {isLoading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <span className="loading-text">Loading...</span>
          </div>
        )}
        <div className="signup-link"> {/* Cambiado de 'acc-text' a 'signup-link' */}
          Already have an account?{' '}
          <a href="#" onClick={() => navigate('/')}>Sign In</a>
        </div>
      </form>
    </div>
  );
}

export default FormRegister;