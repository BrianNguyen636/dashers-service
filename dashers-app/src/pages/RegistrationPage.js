//RegistrationPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './registrationPage.css';

const RegistrationPage = () => {
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupPrimaryAddress, setSignupPrimaryAddress] = useState('');



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
        const response = await fetch('http://localhost:3000/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                CustomerID: 'your_customer_id',  // Replace with actual data
                name: 'singupName',
                PrimaryAddress: 'signupPrimaryAddress', 
                Email: signupEmail,
                Username: signupEmail,
                Password: signupPassword,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            setLoggedIn(true);
            setSignupSuccess(true);
            setSignupError('');
        } else {
            setLoggedIn(false);
            setSignupSuccess(false);
            setSignupError(data.error || 'Signup failed');
        }
    } catch (error) {
        console.error('Error during signup:', error);
        setLoggedIn(false);
        setSignupSuccess(false);
        setSignupError('Signup failed');
    }
};


  const handleLogin = async () => {
    if (!loginEmail || !loginPassword) {
      setLoginSuccess(false);
      setLoginError('Invalid email or password for login');
      return;
  }
    try {
        const response = await fetch('http://localhost:4000/customer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: loginEmail, password: loginPassword }),
        });

        const data = await response.json();

        if (response.ok) {
            setLoggedIn(true);
            setLoginSuccess(true);
            setLoginError('');

            // Redirect to the homepage or another route after successful login
            navigate('/home');
        } else {
            setLoggedIn(false);
            setLoginSuccess(false);
            setLoginError(data.error || 'Login failed');
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
    setLoginEmail('');
    setLoginPassword('');
    setLoggedIn(false);
    setSignupSuccess(false);
    setLoginSuccess(false);
  };

  return (
    <div className="registration-page">
      <div className="forms-container">
      <form>
        <h1>Sign Up</h1>
        {signupError && <p>{signupError}</p>}
        <label>Name:</label>
        <br />
        <input type="text" value={signupName} onChange={(e) => setSignupName(e.target.value)} />
        <br />
        <label>Email:</label>
        <br />
        <input type="email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />
        <br />
        <label>Password:</label>
        <br />
        <input type="password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} />
        <br />
        <label>Primary Address:</label>
        <br />
        <input type="text" value={signupPrimaryAddress} onChange={(e) => setSignupPrimaryAddress(e.target.value)} />
        <br />
        <button type="button" onClick={handleSignUp}>
          Sign Up
        </button>
          {loggedIn && signupSuccess && <p>Sign-up successful! You are now logged in.</p>}
        </form>

        <form>
          <h1>Login</h1>
          {loginError && <p>{loginError}</p>}
          <label>Email:</label>
          <br />
          <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
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

      {loggedIn ? (
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
      )}
    </div>
  );
};

export default RegistrationPage;