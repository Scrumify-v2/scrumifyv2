import React, { useState, useContext, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import Api from './Api';

const Signup = () => {
  const navigate = useNavigate();
  // State & Context hooks
  const [user, setUser] = useContext(UserContext);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [invalidEntry, setInvalidEntry] = useState(false);
  const [duplicateUser, setDuplicateUser] = useState(false);

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
    if (!username || !password) {
      setDuplicateUser(false);
      return setInvalidEntry(true);
    }
    if (username && password) setInvalidEntry(false);
    const payload = { username: username, password: password };
    //fetch call to api to create new user account
    const response = await Api.signup(payload);
    if (typeof response !== 'string') return setDuplicateUser(true);
    setUser(response);
    return navigate('/');
  };

  const handleLogInLink = () => {
    return navigate('/login');
  };

  /*****************
   * END HELPER FUNCTIONS
   ****************/

  return (
    <>
      <div className='titleLogo'>
        <h2>
          Scrumify <strong>v2.0</strong>
        </h2>
      </div>

      <div id='signup' className='auth'>
        <div className='loginFields'>
          <p>Username</p>
          <input type='text' onChange={(e) => handleUsernameInput(e)}></input>
        </div>
        <div>
          <p>Password</p>
          <input
            type='password'
            onChange={(e) => handlePasswordInput(e)}
          ></input>
        </div>
        <button
          className='loginButton'
          type='button'
          onClick={handleSignUpButton}
        >
          Sign Up
        </button>
        {invalidEntry ? (
          <p style={{ fontSize: '12px', textAlign: 'center', width: '200px' }}>
            Username and password fields must not be blank.
          </p>
        ) : (
          ''
        )}
        {duplicateUser ? (
          <p style={{ fontSize: '12px', textAlign: 'center', width: '200px' }}>
            Username already exists.
          </p>
        ) : (
          ''
        )}
        <p style={{ fontSize: '12px', textAlign: 'center', width: '200px' }}>
          Have an account?{' '}
          <a href='#' onClick={() => handleLogInLink()}>
            Log In
          </a>
        </p>
      </div>
    </>
  );
};

export default Signup;
