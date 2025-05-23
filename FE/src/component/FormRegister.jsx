import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Register.css';
import Llamados from '../services/Llamados';



// Componente de registro de usuario
// Este componente maneja el registro de un nuevo usuario
function FormRegister() {
  const obj ={
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
 


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  // Estado para manejar errores y carga
  // Se inicializa el estado de error y carga
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
 
  // Manejo de cambios en los campos del formulario
  // Cada vez que cambie un campo, actualizamos el estado
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
   // Evaluamos la fortaleza de la contraseña solo si ambas contraseñas coinciden  
  // Solo evaluamos la fortaleza cuando ambas contraseñas no están vacías y coinciden
  const passwordStrength =
    formData.password && formData.confirmPassword && formData.password === formData.confirmPassword
      ? evaluatePasswordStrength(formData.password)
      : 0;
  // Definimos etiquetas para la fortaleza de la contraseña
  // 0 = No evaluada, 1 = Débil, 2 = Moderada, 3 = Buena, 4 = Fuerte
  let strengthLabel = "";
  if (passwordStrength === 1) strengthLabel = "Weak";
  else if (passwordStrength === 2) strengthLabel = "Moderate";
  else if (passwordStrength === 3) strengthLabel = "Good";
  else if (passwordStrength === 4) strengthLabel = "Strong";
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
    
    // Por seguridad, verificamos nuevamente que coincidan ambas contraseñas.
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Aquí podrías hacer una llamada a la API para registrar al usuario
    // y manejar la respuesta (éxito/error) según sea necesario.
    setIsLoading(true);

    // Simulación de llamada API
    setTimeout(() => {
      console.log('User registered:', formData);
      setIsLoading(false);
      Llamados.postUsers(formData, 'users')
      navigate('/login'); // Redirigir a la página de inicio de sesión después del registro exitoso
      // Aquí podrías hacer una llamada a la API para registrar al usuario
      // y manejar la respuesta (éxito/error) según sea necesario.
      // Por ejemplo:
      // fetch('/api/register', {
      //   method: 'POST',
    }, 2000);
  };
  // Simulación de llamada API
  // setTimeout(() => {
  //   console.log('User registered:', formData);
  //   setIsLoading(false);
  // const obj = {
  //     name: nombre,
  //     email: email,
  //     password: password,}


  return (
    // input onChange={(e)=> setNombre(e.target.value)}
    // input onChange={(e)=> setEmail(e.target.value)}
    // input onChange={(e)=> setPassword(e.target.value)}
    // Renderizamos el formulario de registro
    // El formulario tiene campos para nombre, email, contraseña y confirmación de contraseña 
    // También muestra la fortaleza de la contraseña y un mensaje de error si es necesario
    // El formulario tiene un botón de envío y un enlace para crear una cuental
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
            {/* Si hay un error, lo mostramos */}

            {error && <div className="error">{error}</div>}
            <div className="btn-container">
              <button className="btn" type="submit" disabled={isLoading || !!error}>
                Submit
              </button>
              {/* Si está cargando, mostramos un mensaje de carga */}
              {isLoading && <span className="loading">Loading...</span>}
              <div className="acc-text">

                New here?{' '}
                <span
                  onClick={() => navigate('/login')}
                  style={{ color: "#0197A6", cursor: "pointer" }}
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