import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App.js';
import Header from './Header.js';
import Progress from './Progress.js';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    if (!user) return navigate('/login');
  });

  return (
    <div className='dashboard'>
      <Header />
      <section className='mainContent'>
        <Progress id='todo' name='To Do' progress='todo' />
        <Progress id='inprogress' name='In Progress' progress='inprogress' />
        <Progress id='completed' name='Completed' progress='completed' />
      </section>
    </div>
  );
}
