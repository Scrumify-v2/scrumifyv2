import React, { useState, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import Api from './Api';

const Login = () => {
  const navigate = useNavigate();
  // State & Context hooks
  const [user, setUser] = useContext(UserContext);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  /*****************
   * HELPER FUNCTIONS
   ****************/
  const handleUsernameInput = (e) => {
    console.log(e.target.value);
    setUsername(e.target.value);
  };

  const handlePasswordInput = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };

  const handleLogInButton = async (e) => {
    const payload = { username: username, password: password };
    //fetch call to api to verify username and password
    const verifiedUser = await Api.login(payload);
    setUsername(verifiedUser);
    return navigate('/');
  };

  const handleSignUpLink = () => {
    return navigate('/signup');
  };

  /*****************
   * END HELPER FUNCTIONS
   ****************/

  return (
    <div id='login'>
      <h1>Scrumify</h1>
      <div>
        <p>Username</p>
        <input type='text' onChange={(e) => handleUsernameInput(e)}></input>
      </div>
      <div>
        <p>Password</p>
        <input type='text' onChange={(e) => handlePasswordInput(e)}></input>
      </div>
      <button type='button' onClick={handleLogInButton}>
        Log In
      </button>
      <p>
        Don't have an account?{' '}
        <button type='button' onClick={() => handleSignUpLink()}>
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default Login;
