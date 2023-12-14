//RegistrationPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './registrationPage.css';
import HeaderBar from '../components/HeaderBar';
import axios from 'axios';

const RegistrationPage = () => {
  const [signupCustomerID, setSignupCustomerID] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupPrimaryAddress, setSignupPrimaryAddress] = useState('');
  const [signupSecondaryAddress, setSignupSecondaryAddress] = useState('');
  const [loginCustomerID, setLoginCustomerID] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (
      !signupName ||
      !signupEmail ||
      !signupEmail.includes('@') ||
      !signupEmail.includes('.com') ||
      !signupPassword ||
      !signupPrimaryAddress
    ) {
      // validations failed, handle accordingly (show an error message, prevent submission, etc.)
      console.log('Invalid data for sign-up');
      setSignupSuccess(false);
      // sets the error message
      setSignupError('Invalid data for sign-up');
      return;
    }

    try {
      const body = {
        'Name': signupName,
        'PrimaryAddress': signupPrimaryAddress,
        'SecondaryAddress': signupSecondaryAddress || '', // Use an empty string if secondary address is not provided
        'Email': signupEmail,
        'Username': signupUsername,
        'Password': signupPassword,
      }
      const response = await axios.post(`http://localhost:4000/customer`, body);
      setSignupCustomerID(response.data.ID);
      setLoginCustomerID(response.data.ID);
      if (response.status == '200') {
        setLoggedIn(true);
        setSignupSuccess(true);
        setSignupError('');
      } else {
        setLoggedIn(false);
        setSignupSuccess(false);
        setSignupError('Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setLoggedIn(false);
      setSignupSuccess(false);
      setSignupError('Signup failed');
    }
  };


  const handleLogin = async () => {
    if (!loginUsername || !loginPassword) {
      setLoginSuccess(false);
      setLoginError('Invalid email or password for login');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:4000/customer/login/${loginUsername}/${loginPassword}`);
      if (response.status == '201') {
        setLoggedIn(false);
        setLoginSuccess(false);
        setLoginError('Login failed');
      } else {
        setLoggedIn(true);
        setLoginSuccess(true);
        setLoginError('');
        setLoginCustomerID(response.data[0].CustomerID);
        navigate(`/home/${response.data[0].CustomerID}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoggedIn(false);
      setLoginSuccess(false);
      setLoginError('Login failed');
    }
  };

  const handleLogout = () => {
    // if successful, setLoggedIn(false)
    setSignupEmail('');
    setSignupPassword('');
    setLoginUsername('');
    setLoginPassword('');
    setLoggedIn(false);
    setSignupSuccess(false);
    setLoginSuccess(false);
  };

  return (
    <div>
      <HeaderBar CustomerID={loginCustomerID} />
      <div className="registration-page">
        <div className="forms-container">
          <form className="form1">
            <h1>Sign Up</h1>
            {signupError && <p>{signupError}</p>}
            <label>Name:</label>
            <br />
            <input type="name" value={signupName} onChange={(e) => setSignupName(e.target.value)} />
            <br />
            <label>Email:</label>
            <br />
            <input type="email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />
            <br />
            <label>Username:</label>
            <br />
            <input type="username" value={signupUsername} onChange={(e) => setSignupUsername(e.target.value)} />
            <br />
            <label>Password:</label>
            <br />
            <input type="password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} />
            <br />
            <label>Primary Address:</label>
            <br />
            <input type="address" value={signupPrimaryAddress} onChange={(e) => setSignupPrimaryAddress(e.target.value)} />
            <br />
            <label>Secondary Address:</label>
            <br />
            <input type="address2" value={signupSecondaryAddress} onChange={(e) => setSignupSecondaryAddress(e.target.value)} />
            <br />
            <button type="button" onClick={handleSignUp}>
              Sign Up
            </button>
            {loggedIn && signupSuccess && <p>Sign-up successful! You are now logged in.</p>}
          </form>

          <form className="form1">
            <h1>Login</h1>
            {loginError && <p>{loginError}</p>}
            <label>Username:</label>
            <br />
            <input type="username" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} />
            <br />
            <label>Password:</label>
            <br />
            <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
            <br />
            <button type="button" onClick={handleLogin}>
              Login
            </button>
            {loggedIn && loginSuccess && <p>Login successful! Welcome back.</p>}
          </form>
        </div>

        {
          loggedIn ? (
            <div>
              <h1>Welcome, User!</h1>
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div>
              <h1>Please Sign Up or Login </h1>
            </div>
          )
        }
      </div >
    </div>

  );
};

export default RegistrationPage;