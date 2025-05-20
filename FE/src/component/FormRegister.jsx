import { useState } from 'react';
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
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setIsLoading(true);

        // Simulate an API call
        setTimeout(() => {
            console.log('User registered:', formData);
            setIsLoading(false);
            navigate('/welcome');
        }, 2000);
    };

    return (
        <div className="form-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                </div>
                {error && <p className="error">{error}</p>}
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <button type="submit">Register</button>
                )}
                <button type="button" onClick={() => navigate('/login')}>Login</button>
                <button type="button" onClick={() => navigate('/')}>Home</button>
            </form>

            <div>

                <>
  {/* From Uiverse.io by Spacious74 */}
  <div className="container">
    <div className="heading">SignIn to your account</div>
    <form className="form" action="">
      <div className="input-field">
        <input
          required=""
          autoComplete="off"
          type="text"
          name="text"
          id="username"
        />
        <label htmlFor="username">Full Name</label>
      </div>
      <div className="input-field">
        <input
          required=""
          autoComplete="off"
          type="email"
          name="email"
          id="email"
        />
        <label htmlFor="email">Email</label>
      </div>
      <div className="input-field">
        <input
          required=""
          autoComplete="off"
          type="password"
          name="text"
          id="password"
        />
        <label htmlFor="username">Password</label>
      </div>
      <div className="btn-container">
        <button className="btn">Submit</button>
        <div className="acc-text">
          New here ?
          <span style={{ color: "#0000ff", cursor: "pointer" }}>
            Create Account
          </span>
        </div>
      </div>
    </form>
  </div>
</>

            </div>
        </div>



    );
}

export default FormRegister;