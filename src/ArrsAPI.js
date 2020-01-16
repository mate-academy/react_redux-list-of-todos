const URLusers = 'https://jsonplaceholder.typicode.com/users';
const URLtodos = 'https://jsonplaceholder.typicode.com/todos';

export const getUsers = async() => {
  const response = await fetch(URLusers);

  return response.json();
};

export const getTodos = async() => {
  const response = await fetch(URLtodos);

  return response.json();
};
