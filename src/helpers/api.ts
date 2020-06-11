const URL_TODOS = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api/todos.json';
const URL_USERS = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api/users.json';

const getUsers = async (): Promise<PersonFromServer[]> => {
  const response = await fetch(URL_USERS);
  const usersFromServer = await response.json();

  return usersFromServer;
};

const getTodos = async (): Promise<TodoFromServer[]> => {
  const response = await fetch(URL_TODOS);
  const todosFromServer = await response.json();

  return todosFromServer;
};

export const getPreparedTodos = async (): Promise<Todo[]> => {
  const todos = await getTodos();
  const users = await getUsers();
  const preparedTodos = todos.map(todo => ({
    ...todo,
    user: users.find(user => todo.userId === user.id) as PersonFromServer,
  }));

  return preparedTodos;
};
