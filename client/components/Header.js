import React, { Component, useState, useEffect } from 'react';

const Header = () => {
  const [task, setTask] = useState('');
  
  const handleTaskInput = (e) => {
    console.log(e.target.value);
    setTask(e.target.value);
  };
  
  const handleClick = (e) => {
    const payload = {task: task};
    console.log(payload);
  };

  return (
    <div className="newTask">
      <input
        type="text"
        id="taskBox"
        placeholder="Add new task"
        required
        onChange={(e) => handleTaskInput(e)}
      >    
      </input>
      <button className="addTask" onClick={(e) => handleClick(e)}>
        Add Task
      </button>
    </div>
  );
};

export default Header;