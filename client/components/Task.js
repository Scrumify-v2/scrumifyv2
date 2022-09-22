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
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-left-short moveButton" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
        </svg>
      </button>
      <div className='taskContent'>
        <h3 className="taskTitle">{taskName}</h3>
        {editContent ? (
          <div className='modal'>
            <textarea
              value={textArea}
              rows='4'
              cols='25'
              onChange={(e) => handleTextArea(e)}
            />
            <div className='modalButtonArea'>
              <button className='modalSubmitButton modalButton' onClick={() => handleSubmitTextBtn()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
</svg>
              </button>
              <button className='modalCancelButton modalButton' onClick={() => handleCancelTextBtn()}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-return-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
</svg></button>
            </div>
          </div>
        ) : (
          <p className='taskText'>{content}</p>
        )}
        
        <div className='taskButtonContainer'>
          <button className='taskButton editButton' onClick={() => handleEditBtn()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
              <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
            </svg>
          </button>
          <button className='taskButton deleteButton' onClick={() => handleDelete()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg>
          </button>
        </div>
      </div>
      <button className='move' onClick={() => handleMoveRight()}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-right-short moveButton" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
        </svg>
      </button>
    </section>
  );
}
