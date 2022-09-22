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
  const [invalidEntry, setInvalidEntry] = useState(false);
  const [invalidLogin, setInvalidLogin] = useState(false);

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
    if (!username || !password) {
      setInvalidLogin(false);
      return setInvalidEntry(true);
    }

    const payload = { username: username, password: password };
    //fetch call to api to verify username and password
    const response = await Api.login(payload);
    console.log(response);
    if (typeof response !== 'string') return setInvalidLogin(true);
    setUser(response);
    return navigate('/');
  };

  const handleSignUpLink = () => {
    return navigate('/signup');
  };

  /*****************
   * END HELPER FUNCTIONS
   ****************/

  return (
    <div id='login' className='auth'>
        <div><h2 className='titleLogo'>Scrumify <strong>v2.0</strong></h2></div>
      <div>
        <p>Username</p>
        <input type='text' onChange={(e) => handleUsernameInput(e)}></input>
      </div>
      <div>
        <p>Password</p>
        <input type='password' onChange={(e) => handlePasswordInput(e)}></input>
      </div>
      <button type='button' onClick={handleLogInButton}>
        Log In
      </button>

      {invalidEntry ? (
        <p style={{ fontSize: '12px', textAlign: 'center', width: '200px' }}>
          Username and password fields must not be blank.
        </p>
      ) : (
        ''
      )}
      {invalidLogin ? (
        <p style={{ fontSize: '12px', textAlign: 'center', width: '200px' }}>
          Invalid login. Please check your username or password.
        </p>
      ) : (
        ''
      )}

      <p style={{ fontSize: '12px', textAlign: 'center', width: '200px' }}> 
        Don't have an account?{' '}
        <a href='#' onClick={() => handleSignUpLink()}>
          Sign Up
        </a>
      </p>
    </div>
  );
};

export default Login;
