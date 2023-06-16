import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    console.log('Submitting login form...');
    event.preventDefault();

    try {
      const params = new URLSearchParams();
      params.append('username', username);
      params.append('password', password);

      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };

      const response = await axios.post(
        'http://23.88.50.20:3000/api/login',
        params.toString(),
        config
      );

      alert('Login successful');
      console.log('Response data:', response.data);

      // Redirect to the next screen or perform any other action
      const uniqueId = response.data.data._id;
      console.log('uniqueId:', uniqueId);

      localStorage.setItem('uniqueId', uniqueId);

      localStorage.setItem('login', 'false');
      setUsername('');
      setPassword('');
      history.push('/');
    } catch (error) {
      alert('Invalid username or password');
      // Display an error message or perform any other action
    }
  };

  useEffect(() => {
    const storedUniqueId = localStorage.getItem('uniqueId');
    const isLoggedIn = localStorage.getItem('');
    if (storedUniqueId && isLoggedIn) {
      // User is already logged in, redirect to the map page
      history.push('/');
    }
  }, [history]);

 

  return (
    <div className="login-container">
      <div className="logo">
        <img src={require('./images/logo.png')} alt="Logo" />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-outline mb-4">
          <span className="far fa-user"></span>
          <input
            type="text"
            id="form2Example1"
            className="form-control"
            placeholder="Enter Username"
            value={username}
            onChange={handleUsernameChange}
          />
          <label className="form-label" htmlFor="form2Example1"></label>
        </div>

        <div className="form-outline mb-4">
          <span className="fas fa-key"></span>
          <input
            type="password"
            id="form2Example2"
            className="form-control"
            placeholder="Enter Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <div className="form-check d-flex justify-content-start mb-4 mt-3 ml-3">
            <div className="form-check" style={{ marginLeft: '-23px' }}>
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="form1Example3"
                style={{ borderRadius: '0' }}
              />
              <label className="form-check-label" htmlFor="form1Example3">
                Remember password
              </label>
            </div>
          </div>
          <label className="form-label" htmlFor="form2Example2"></label>
        </div>

        <p className="small mb-5 pb-lg-2 text-center">
          <a className="text-black-50 " href="#!">
            Forgot password?
          </a>
        </p>

        <div className="d-flex justify-content-center">
          <button className="btn" type="submit">
            Login
          </button>
        </div>

        <div>
          <p className="mb-0">
            Don't have an account? <a href="#!">Sign Up</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;
