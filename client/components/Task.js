import React, { Component, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from './Api';

export default function Task({ _id, content, progress, taskName, user }) {
  const navigate = useNavigate();
  const [editContent, setEditContent] = useState(false);
  const [textArea, setTextArea] = useState(content);

  /*****************
   * HELPER FUNCTIONS
   ****************/

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

  const handleEditBtn = async () => {
    setEditContent(true);
  };

  const handleTextArea = (e) => setTextArea(e.target.value);

  const handleSubmitTextBtn = async () => {
    //payload is textArea
    const payload = { taskId: _id, content: textArea };
    //api call
    const response = await Api.updateTask(payload);
    setTextArea(null);
    return setEditContent(false);
  };

  const handleCancelTextBtn = async () => {
    return setEditContent(false);
  };

  //delete api call
  const handleDelete = () => {
    const payload = { taskId: _id };
    const response = Api.deleteTask(payload);
    return response;
  };

  /*****************
   * END HELPER FUNCTIONS
   ****************/

  return (
    <section className='task-list task-item container'>
      <button className='move' onClick={() => handleMoveLeft()}>
        ⬅️
      </button>
      <div>
        <h3>{taskName}</h3>
        {editContent ? (
          <div>
            <textarea
              value={textArea}
              rows='4'
              cols='25'
              onChange={(e) => handleTextArea(e)}
            />
            <button onClick={() => handleSubmitTextBtn()}>Submit</button>
            <button onClick={() => handleCancelTextBtn()}>Cancel</button>
          </div>
        ) : (
          <p>{content}</p>
        )}

        <button className='taskButton' onClick={() => handleEditBtn()}>
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
