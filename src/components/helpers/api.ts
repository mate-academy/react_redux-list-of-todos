const API_URL_TODOS = 'https://jsonplaceholder.typicode.com/todos';
const API_URL_USER = 'https://jsonplaceholder.typicode.com/users';

export const getTodos = async () => {
  const response = await fetch(API_URL_TODOS);
  const dataTodos = await response.json();

  return dataTodos;
};

export const getUsers = async () => {
  const response = await fetch(API_URL_USER);
  const dataUsers = await response.json();

  return dataUsers;
};

export const getPrepareTodos = async () => {
  const [todos, users] = await Promise.all([getTodos(), getUsers()]);

  const prepareTodos = todos.map((todo: Todo) => ({
    ...todo,
    userId: { ...users.find((user: User) => user.id === todo.userId) },
  }));

  return prepareTodos;
};
