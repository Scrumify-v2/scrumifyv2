import React, { useState, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import Api from './Api';
import Modal from './Modal';

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
    if (typeof response !== 'string') return setInvalidLogin(true);
    setUser(response);
    return navigate('/');
  };

  const handleSignUpLink = () => {
    return navigate('/signup');
  };

  const closeModal = (val) => {
    setInvalidEntry(val);
    setInvalidLogin(val);
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
      <div id='login' className='auth'>
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
          onClick={handleLogInButton}
        >
          Log In
        </button>

        {invalidEntry && (
          <Modal
            closeModal={closeModal}
            invalidMessage={'Username and password fields must not be blank.'}
          />
        )}

        {invalidLogin && (
          <Modal
            closeModal={closeModal}
            invalidMessage={'Please check your username and/or password.'}
          />
        )}

        <p style={{ fontSize: '12px', textAlign: 'center', width: '200px' }}>
          Don&apos;t have an account?{' '}
          <a href='#' onClick={() => handleSignUpLink()}>
            Sign Up
          </a>
        </p>
      </div>
    </>
  );
};

export default Login;
