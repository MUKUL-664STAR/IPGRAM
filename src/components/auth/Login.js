
import React, { useState } from 'react';
import axios from 'axios';
import './Singup.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { username, password });
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Login</h2>
        <form>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </form>
        <div className="link">
          <p>Don't have an account? <a href="/signup">Signup here</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
