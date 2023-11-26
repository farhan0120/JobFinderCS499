import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './login.css';

function Registration() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const checkLogin = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/getUser/${username}/${password}`);
      if (response.status === 200) {
        localStorage.setItem('username', username);
        history.push('');
      } else {
        setError('Error during login');
      }
    }catch(error){
      setError('An error occurred during login');
      console.error(error);
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (username === '' && password === '') {
      setError('Error: Username and Password cannot be empty');
      return;
    } else if (username === '') {
      setError('Error: Username cannot be empty');
      return;
    } else if (password === '') {
      setError('Error: Password cannot be empty');
      return;
    }
    checkLogin();
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    setError('');

    if (username === '' && email === '' && password === '') {
        setError('Error: Username, Email, and Password cannot be empty');
        return;
    }else if (username === '') {
        setError('Error: Username cannot be empty');
        return;
    }else if (email === '') {
        setError('Error: Email cannot be empty');
        return;
    }else if (password === '') {
        setError('Error: Password cannot be empty');
        return;
    }

    try {
      const response = await axios.get(`http://127.0.0.1:5000/findUser/${username}`);
      const data = response.data;

      if (data.error) {
        const request = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: username, email: email, password: password }),
        };

        const registrationResponse = await axios.post('http://127.0.0.1:5000/makeNewUser', {
          username: username,
          email: email,
          password: password,
        });

        if (registrationResponse.status === 200) {
          localStorage.setItem('username', username);
          history.push('/');
        } else {
          setError('An error occurred during registration');
        }
      } else {
        setError('Username already in use');
      }
    } catch (error) {
      setError('An error occurred during registration');
      console.error(error);
    }
  };

  return (
    <div className="Login">
      <font id="loginTitle">
        <h1>Sign In</h1>
      </font>
      <form id="loginBox">
        {error && <p className="error">{error}</p>}
        <label>
          Username:
          <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        </label>
        <label>
          Email:
          <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <button onClick={handleLogin} type="submit">
          Login
        </button>
        <button onClick={handleSignUp} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Registration;
