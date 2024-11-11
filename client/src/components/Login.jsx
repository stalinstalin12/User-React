import "./style.css";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default  function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate(); // Initialize navigate

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/login', { email, password });
            console.log(response.data);

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            console.log(localStorage);

            alert("Login Successful");
            console.log("login successful");

            // Navigate to the Dashboard component after successful login
            navigate('/add'); // Redirect to the path defined in App.js
        } catch (err) {
            setError(err.response?.data?.error || 'login failed');
            alert('Login Failed');
        }
    };




  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input type="email" placeholder="Your Email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Password" id="pass" required  value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button type="submit" className="register-button">Login</button>
          

        </form>
      </div>
    </div>
  );
}

