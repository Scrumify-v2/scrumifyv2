const Api = {};

// LOGIN
Api.login = async (payload) => {
  const url = '/user/login';
  const option = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };

  const response = await fetch(url, option)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log('Error with Api.login'));

  return response;
};

// SIGN UP
Api.signup = async (payload) => {
  const url = '/user/signup';
  const option = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };

  const response = await fetch(url, option)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => console.log('Error with Api.signup'));

  return response;
};

Api.getAllTasks = async (payload) => {
  console.log(payload);
  const url = `/task/${payload.username}`;
  const option = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  const response = await fetch(url, option)
    .then((response) => response.json())
    .then((data) => {
      console.log('In getAllTasks. This is the data:');
      console.log(data);
      if (data.length > 0)
        return data.filter((task) => task.progress === payload.progress);
      console.log('About to log null');
      return null;
    })
    .catch((err) => console.log(`Error getting all ${payload.progress} tasks`));

  return response;
};

//CREATE TASK API
Api.createTask = async (payload) => {
  const url = '/task';
  const option = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };
  const response = await fetch(url, option)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log('Error with API.createTask'));
  return response;
};

//MOVE TASK API
Api.moveTask = async (payload) => {
  const url = '/task/move';
  const option = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };
  const response = await fetch(url, option)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log('Error with Api.moveTask'));
  return response;
};

//UPDATE TASK API
Api.updateTask = async (payload) => {
  const url = '/task/update';
  const option = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };
  const response = await fetch(url, option)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log('Error with Api.editTask'));
  return response;
};

//DELETE TASK API
Api.deleteTask = async (payload) => {
  console.log(payload);
  const url = '/task';
  const option = {
    method: 'DELETE',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
  };
  //fetch api call
  const response = await fetch(url, option)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log('Error with API.deleteTask'));
  return response;
};

export default Api;
