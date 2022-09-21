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

export default Api;
