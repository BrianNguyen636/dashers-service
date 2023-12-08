<<<<<<< HEAD
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// RegistrationPage.js
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [loginError, setLoginError] = useState('');
  

  const handleSignUp = () => {
    if (!signupEmail || !signupEmail.includes('@') || !signupEmail.includes('.com') || !signupPassword) {
      // validations failed, handle accordingly (show an error message, prevent submission, etc.)
      console.log('Invalid email for sign-up');
      setSignupSuccess(false);
      // sets the error message
      setSignupError('Invalid email or password for sign-up');
      return;
    }

    console.log('Signing up with:', signupEmail, signupPassword);
    // simulates a successful sign-up
    setLoggedIn(true);
    setSignupSuccess(true);
    // clears the error message
    setSignupError('');
  };

  const handleLogin = () => {
    if (!loginEmail || !loginEmail.includes('@') || !loginEmail.includes('.com') || !loginPassword) {
      // validation failed, handle accordingly (show an error message, prevent submission, etc.)
      console.log('Invalid email for login');
      setLoginSuccess(false);
      // sets the error message
      setLoginError('Invalid email or password for login');
      return;
    }

    console.log('Logging in with:', loginEmail, loginPassword);
    // simulate a successful login
    setLoggedIn(true);
    setLoginSuccess(true);
    // clears the error message
    setLoginError('');
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
          <label>Email:</label>
          <input type="email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />
          <br />
          <label>Password:</label>
          <input type="password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} />
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
          <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
          <br />
          <label>Password:</label>
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

export default App;
=======
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import RestaurantPage from "./pages/RestaurantPage";
import OrderSum from './pages/OrderSum';
import RestaurantDetail from "./pages/RestaurantDetail";


function App() { 
return ( 
<div className="app"> 
<BrowserRouter> 
<Routes> 
  <Route path="/res" element={<RestaurantPage />} />
  <Route path="/restaurant/detail/:RestaurantID" element={<RestaurantDetail />} />
  <Route path="/order" element={<OrderSum />} />
</Routes> 
<div id = "main"> </div>
</BrowserRouter> 
</div> 
); 
} 
export default App;
>>>>>>> brian
