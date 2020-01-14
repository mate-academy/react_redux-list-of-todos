const todosURL = 'https://jsonplaceholder.typicode.com/todos';
const usersURL = 'https://jsonplaceholder.typicode.com/users';

const getData = url => fetch(url)
  .then(response => response.json());

export const getTodos = () => getData(todosURL);
export const getUsers = () => getData(usersURL);
