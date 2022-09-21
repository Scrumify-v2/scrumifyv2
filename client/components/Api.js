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
    .then((data) => data)
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
      if (data.length) return data.filter((task) => task.category === 'todo');
      return null;
    })
    .then((err) => console.log(`Error getting all ${payload.category} tasks`));
};

export default Api;
