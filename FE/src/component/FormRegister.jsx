import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Register.css';
import Llamados from '../services/Llamados';

function FormRegister() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

  const passwordStrength =
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword
      ? evaluatePasswordStrength(formData.password)
      : 0;

  const strengthLabels = ["", "Weak", "Moderate", "Good", "Strong"];
  const strengthLabel = strengthLabels[passwordStrength];

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
      }, 'users/');

      console.log('User registered successfully:', response);
      navigate('/');

    } catch (error) {
      console.error('Registration error:', error);
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="container">
        <div className="heading">Sign In to your account</div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-field">
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <label htmlFor="username">Full Name</label>
          </div>
          <div className="input-field">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="input-field">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
          </div>

          {formData.password &&
            formData.confirmPassword &&
            formData.password === formData.confirmPassword && (
              <div className="password-strength">
                Password Strength: {strengthLabel}
              </div>
            )}

          {error && <div className="error">{error}</div>}

          <div className="btn-container">
            <button className="btn" type="submit" disabled={isLoading || !!error}>
              Submit
            </button>
            {isLoading && <span className="loading">Loading...</span>}
            <div className="acc-text">
              New here?{' '}
              <span onClick={() => navigate('/register')} style={{ color: "#0197A6", cursor: "pointer" }}>
                Create Account
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormRegister;