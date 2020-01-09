const todosURL = 'https://jsonplaceholder.typicode.com/todos';
const usersURL = 'https://jsonplaceholder.typicode.com/users';

export const getTodosFromServer = async() => {
  const response = await fetch(todosURL);

  return response.json();
};

export const getUsersFromServer = async() => {
  const response = await fetch(usersURL);

  return response.json();
};
