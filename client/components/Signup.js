import React, { useState, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import Api from './Api';

const Signup = () => {
  console.log('THIS IS HERE');
  const navigate = useNavigate();
  // State & Context hooks
  const [user, setUser] = useContext(UserContext);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  /*****************
   * HELPER FUNCTIONS
   ****************/
  const handleUsernameInput = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUpButton = async (e) => {
    const payload = { username: username, password: password };
    //fetch call to api to create new user account
    const verifiedUser = await Api.signup(payload);
    setUser(verifiedUser);
    return navigate('/');
  };

  const handleLogInLink = () => {
    return navigate('/login');
  };

  /*****************
   * END HELPER FUNCTIONS
   ****************/

  return (
    <div id='signup'>
      <h1>Scrumify</h1>
      <div>
        <p>Username</p>
        <input type='text' onChange={(e) => handleUsernameInput(e)}></input>
      </div>
      <div>
        <p>Password</p>
        <input type='text' onChange={(e) => handlePasswordInput(e)}></input>
      </div>
      <button type='button' onClick={handleSignUpButton}>
        Sign Up
      </button>
      <p>
        Already have an account?{' '}
        <button type='button' onClick={handleLogInLink}>
          Click here!
        </button>
      </p>
    </div>
  );
};

export default Signup;
