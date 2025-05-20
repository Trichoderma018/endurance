import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/FormRegister.css';

function FormRegister() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Cada vez que cambie la contraseña o el confirm, se evalúa la coincidencia.
  useEffect(() => {
    if (formData.password && formData.confirmPassword) {
      if (formData.password === formData.confirmPassword) {
        setError(null); // Si coinciden, limpiamos errores
      } else {
        setError('Passwords do not match.');
      }
    } else {
      setError(null);
    }
  }, [formData.password, formData.confirmPassword]);

  // Función opcional para evaluar la fortaleza de la contraseña
  const evaluatePasswordStrength = (password) => {
    let strengthPoints = 0;
    if (password.length >= 8) strengthPoints++;
    if (/[A-Z]/.test(password)) strengthPoints++;
    if (/[0-9]/.test(password)) strengthPoints++;
    if (/[^A-Za-z0-9]/.test(password)) strengthPoints++;
    return strengthPoints;
  };

  // Solo evaluamos la fortaleza cuando ambas contraseñas no están vacías y coinciden
  const passwordStrength =
    formData.password && formData.confirmPassword && formData.password === formData.confirmPassword
      ? evaluatePasswordStrength(formData.password)
      : 0;

  let strengthLabel = "";
  if (passwordStrength === 1) strengthLabel = "Weak";
  else if (passwordStrength === 2) strengthLabel = "Moderate";
  else if (passwordStrength === 3) strengthLabel = "Good";
  else if (passwordStrength === 4) strengthLabel = "Strong";

  const handleSubmit = (event) => {
    event.preventDefault();

    // Por seguridad, verificamos nuevamente que coincidan ambas contraseñas.
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    // Simulación de llamada API
    setTimeout(() => {
      console.log('User registered:', formData);
      setIsLoading(false);
      navigate('/welcome');
    }, 2000);
  };

  return (
    <div className="form-container">
      <div>
        <div className="container">
          <div className="heading">SignIn to your account</div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="input-field">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label htmlFor="name">Full Name</label>
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

            {/* Si ambas contraseñas coinciden, evaluamos la fortaleza */}
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
                <span
                  onClick={() => navigate('/login')}
                  style={{ color: "#0000ff", cursor: "pointer" }}
                >
                  Create Account
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormRegister;