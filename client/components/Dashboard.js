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
    <div>
      <h2>Scrumify v2.0</h2>
      <Header />
      <section className='mainContent'>
        <Progress name='To Do' progress='todo' />
        <Progress name='In Progress' progress='inprogress' />
        <Progress name='Completed' progress='completed' />
      </section>
    </div>
  );
}
