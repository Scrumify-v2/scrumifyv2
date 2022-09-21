import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header.js';
import Todo from './Todo.js';
import Progress from './Progress.js';
import Completed from './Completed.js';

export default function Dashboard() {
  const navigate = useNavigate();

  // const handleClick = () => {
  //   return navigate('/login');
  //   <div>
  //   <div>Dashboard</div>
  //   <button type='button' onClick={() => handleClick()}>
  //     Log In
  //   </button>
  // </div>
  // };

  return (
    <>
      <h2>Scrumify v2.0</h2>
      <Header />
      <section className='mainContent'>
        <Todo />
        <Progress />
        <Completed />
      </section>
    </>
  );
}
