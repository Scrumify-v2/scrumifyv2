import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../App';
import Task from './Task';
import Api from './Api';

export default function Todo() {
  //user context
  const [user, setUser] = useContext(UserContext);
  //declare state for tasks
  const [todoTasks, setTodoTasks] = useState(null);

  //use effect to monitor changes in task list
  useEffect(() => {
    apiGetTasks();
  }, []);

  /*****************
   * HELPER FUNCTIONS
   ****************/
  const apiGetTasks = async () => {
    //build payload = username, category
    const payload = { username: user, category: 'todo' };
    //fetch call, get request
    const response = await Api.getAllTasks(payload);
    //update state
    return setTodoTasks(response);
  };
  /*****************
   * END HELPER FUNCTIONS
   ****************/

  const tasks = [];
  //check if todoTasks is not null
  if (todoTasks) {
    //iterate thru array of todoTasks
    //build the tasks to be generated
    for (const task of todoTasks) {
      tasks.push(<Task key={task._id} {...task} />);
    }
    return (
      <section className='column'>
        <h2>Todo</h2>
        {tasks.length > 0 ? tasks : ''}
      </section>
    );
  }
  return (
    <section className='column'>
      <h2>Todo</h2>
    </section>
  );
}
