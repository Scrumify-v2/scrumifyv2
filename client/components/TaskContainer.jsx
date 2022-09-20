// import e from 'express';
import React, { Component, useState, useEffect } from 'react';
import Task from './Task.jsx';

const TaskContainer = (props) => {

  const [everything, setEverything] = useState(null);
  const [starting, setStarting] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);
  

  function getProgress (string) {
    fetch('/projects/project')
    .then(res => res.json())
    .then( (data) => {
      console.log(data);
      setEverything(data);
    })
  }

  function updateProgress (task) {
    fetch('/projects/project', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({task: task})
    })
  }

  useEffect( () => {
    getProgress();

  }, [])

  // useEffect( (task) => {
  //   updateProgress(task);
  // })

  if (everything){
    console.log(everything, 'state');
  }

  // setStarting(everything.to_be_started);
  
  // setInProgress(everything.in_progress);

  // setCompleted(everything.completed);
  // function CreateTask({ addTask }){
  //   const [task, setTask] = useState('');

  //   const handleSubmit = e => {
  //     e.preventDefault();
  //     if(!value) return;

  //     addTask(value);
  //     setValue(" ");
  //   }
  // }
  
  // useEffect( () => {
  //   <Task value = {props.todo} />; 
  //   // for (const value in Object.values(todo) {
  //     console.log(props);
  //   // }
  // }, [props.todo])
  
  return (
    <div id="taskContainer">
      <div className="toBe" id="leftBox">
      To Be Started
      {/* [starting] */}
        <button className="buttons" onClick={() => submit({ task: task })}>
        Move 
        </button>
        <button>
        Edit
        </button>
        <button>
        Delete
        </button>
        
        <div>
        
        </div>
      </div>
      <div className="toBe" id="middleBox">
      In Progress  
      {/* [inProgress]  */}
        <button className="buttons" onClick={() => submit({ task: task })}>
        Move
        </button>
        <button>
        Edit
        </button>
        <button>
        Delete
        </button>
      </div>
      <div className="toBe" id="rightBox">
      Completed
      {/* [completed] */}
        <button className="buttons" onClick={() => submit({ task: task })}>
        Completed
        </button>
        <button>
        Edit
      </button>
      <button>
        Delete
      </button>
      </div>
      </div>
  );
};

export default TaskContainer;
