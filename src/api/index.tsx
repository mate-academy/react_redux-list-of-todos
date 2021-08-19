const BASE_URL = 'https://mate-api.herokuapp.com/';

const request = async (url: string) => {
  const response = await fetch(BASE_URL + url);

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  return response.json();
};

export const getTodos = async () => {
  const response = await request('todos/');

  return response;
};

export const getUser = async (id: number) => {
  const response = await request('users/' + id);

  return response;
};
