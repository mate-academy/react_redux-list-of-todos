const BASE__URL = 'https://mate-api.herokuapp.com/';

const request = async(url) => {
  const response = await fetch(`${BASE__URL}${url}`);

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  return response.json();
};

export const getTodos = async() => {
  const response = await request('todos');

  return response.data;
};

export const getUser = async(userId) => {
  const response = await request(`users/${userId}`);

  return response.data;
};
