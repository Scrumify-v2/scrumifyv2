import React, { Component, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import Task from '../temp/Task';
import Api from './Api';

export default function Task({ _id, content, progress, taskName, user }) {
  const navigate = useNavigate();
  //move api call
  const handleMoveLeft = () => {
    let payload;
    if (progress === 'inprogress') payload = { taskId: _id, progress: 'todo' };
    if (progress === 'completed')
      payload = { taskId: _id, progress: 'inprogress' };
    //api call
    const response = Api.moveTask(payload);
    return navigate('/');
  };
  const handleMoveRight = () => {
    let payload;
    if (progress === 'todo') payload = { taskId: _id, progress: 'inprogress' };
    if (progress === 'inprogress')
      payload = { taskId: _id, progress: 'completed' };
    //api call
    const response = Api.moveTask(payload);
  };
  //edit api call
  const handleEdit = async () => {
    await Api.moveTask;
  };
  //delete api call
  const handleDelete = async () => {
    await Api.moveTask;
  };
  
  return (
    <section className='task-list task-item container'>
      <button className='move' onClick={() => handleMoveLeft()}>
        ⬅️
      </button>
      <div>
        <h3>{taskName}</h3>
        <p>{content}</p>
        <button className='taskButton' onClick={() => handleEdit()}>
          Edit
        </button>
        <button className='taskButton' onClick={() => handleDelete()}>
          Delete
        </button>
      </div>
      <button className='move' onClick={() => handleMoveRight()}>
        ➡️
      </button>
    </section>
  );
}
