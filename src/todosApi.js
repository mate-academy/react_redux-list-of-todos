const todosUrl = 'https://jsonplaceholder.typicode.com/todos';
const usersUrl = 'https://jsonplaceholder.typicode.com/users';

export const getTodos = async() => {
  const todoData = await fetch(todosUrl);

  return todoData.json();
};

export const getUsers = async() => {
  const userData = await fetch(usersUrl);

  return userData.json();
};
