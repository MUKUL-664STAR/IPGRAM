// Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import './Singup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:5000/auth/Singup', { username, password, role });
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Signup</h2>
        <form>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <label>
            Role:
            <input type="text" value={role} onChange={(e) => setRole(e.target.value)} />
          </label>
          <button type="button" onClick={handleSignup}>
            Signup
          </button>
        </form>
        <div className="link">
          <p>Already have an account? <a href="/login">Login here</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
