import React, { Component, useState, useEffect, useContext } from 'react';
import { UserContext } from '../App';
import { Navigate, useNavigate } from 'react-router-dom';
import Api from './Api';

const Header = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState('');
  const [content, setContent] = useState('');
  const [user, setUser] = useContext(UserContext);
  const [username, setUsername] = useState(null);

  const handleTaskInput = (e) => {
    console.log(e.target.value);
    setTask(e.target.value);
  };

  const handleContentInput = (e) => {
    setContent(e.target.value);
  };

  const handleClick = async () => {
    const payload = {
      user: user,
      taskName: task,
      content: content,
      progress: 'todo',
    };
    const addedTask = await Api.createTask(payload);
    setTask('');
    setContent('');
    document.getElementById('contentBox').value = null;
    document.getElementById('taskBox').value = null;
    return navigate('/');
  };

  const handleLogOut = () => {
    setUsername(null);
    return navigate('/login');
  };

  return (
    <div className='header'>
      <div className='newTask'>
        <input
          type='text'
          id='taskBox'
          placeholder='Add new task'
          required
          onChange={(e) => handleTaskInput(e)}
        ></input>
        <input
          type='text'
          id='contentBox'
          placeholder='Add description'
          required
          onChange={(e) => handleContentInput(e)}
        ></input>
        <button className='addTask' onClick={() => handleClick()}>
          Add Task
        </button>
      </div>
      <div className='logOut'>
        <p>{user} is logged in.</p>
        <button className='logOut' onClick={() => handleLogOut()}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Header;
