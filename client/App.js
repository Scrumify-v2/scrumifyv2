import React, { useState, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';


const UserContext = createContext([{}, () => {}]);

const App = () => {
  //set user state
  const [user, setUser] = useState(null);

  //render dashboard
  return (
    <div id='root'>
      <UserContext.Provider value={[user, setUser]}>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
};

export { App, UserContext };
