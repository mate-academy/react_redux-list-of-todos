const API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

const TODOS_PATH = '/todos.json';
const USERS_PATH = '/users.json';

const getAll = <T>(url: string): Promise<T[]> => {
  return fetch(API_URL + url)
    .then(response => response.json());
}

const getTodos = () => getAll<Todo>(TODOS_PATH);
const getUsers = () => getAll<User>(USERS_PATH);

export const getData = async () => {
  const todosFromServer = await getTodos();
  const usersFromServer = await getUsers();

  const preparedTodos = todosFromServer.map(todo => ({
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId),
  }));

  return preparedTodos;
}
