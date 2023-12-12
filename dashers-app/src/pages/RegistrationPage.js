//RegistrationPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './registrationPage.css';

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
  const navigate = useNavigate();

  // // Add a useEffect hook to fetch customer data on component mount
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('http://localhost:4000/customer/:ID', {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       });

  //       const data = await response.json();

  //       if (response.ok) {
  //         // Use the fetched data to set the CustomerID
  //         setSignupCustomerID(data.CustomerID);
  //       } else {
  //         console.error('Error fetching customer data:', data.error || 'Fetch failed');
  //       }
  //     } catch (error) {
  //       console.error('Error during customer data fetch:', error);
  //     }
  //   };

  //   // Call the fetchData function
  //   fetchData();
  // }, []); // Empty dependency array ensures the effect runs only once on mount
  
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
      // Fetch the latest customer ID from the server
      const idResponse = await fetch('http://localhost:4000/Customer/:Id');
      const latestCustomerID = await idResponse.json();

      // Increment the latest customer ID to get a new one
      const newCustomerID = latestCustomerID + 1;

      // Set the new customer ID in the state
      setSignupCustomerID(newCustomerID);
      
      // Now, proceed with the signup logic using newCustomerID
        const response = await fetch('http://localhost:4000/customer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                CustomerID: signupCustomerID,  
                Name: signupName,
                PrimaryAddress: signupPrimaryAddress, 
                SecondaryAddress: signupSecondaryAddress || '', // Use an empty string if secondary address is not provided
                Email: signupEmail,
                Username: signupUsername,
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
    if (!loginUsername || !loginPassword) {
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
            body: JSON.stringify({ username: loginUsername, password: loginPassword }),
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
    setLoginUsername('');
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

        <form>
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