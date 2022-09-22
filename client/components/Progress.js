import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../App';
import Task from './Task';
import Api from './Api';

export default function Progress(props) {
  //user context
  const [user, setUser] = useContext(UserContext);
  //declare state for tasks
  const [allTasks, setAllTasks] = useState(null);

  //use effect to monitor changes in task list
  useEffect(() => {
    apiGetTasks();
  });

  /*****************
   * HELPER FUNCTIONS
   ****************/
  const apiGetTasks = async () => {
    //build payload = user, progress
    const payload = { user: user, progress: props.progress };
    //fetch call, get request
    const response = await Api.getAllTasks(payload);
    //update state
    return setAllTasks(response);
  };
  /*****************
   * END HELPER FUNCTIONS
   ****************/
  const columnName = props.progress;
  const taskArray = [];
  //check if todoTasks is not null
  if (allTasks) {
    //iterate thru array of todoTasks
    //build the tasks to be generated
    for (const task of allTasks) {
      taskArray.push(<Task key={task._id} {...task} />);
    }
    return (
      <section className='column' id={columnName}>
        <h2 className='progressTitle'>{props.name}</h2>
        {taskArray.length > 0 ? taskArray : ''}
      </section>
    );
  }
  return (
    <section className='column'>
      <h2 className='progressTitle'>{props.name}</h2>
    </section>
  );
}
