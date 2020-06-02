
const BASE_URL = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api';
const TODOS_URL = `${BASE_URL}/todos.json`;
const USERS_URL = `${BASE_URL}/users.json`;

const getTodos = () => {
  return fetch(TODOS_URL)
    .then(todos => todos.json());
};

const getUsers = () => {
  return fetch(USERS_URL)
    .then(users => users.json());
};

export const getPreparedTodos = async () => {
  const [todos, users] = await Promise.all([getTodos(), getUsers()]);

  return todos.map((todo: TodoFromServer) => {
    return {
      ...todo,
      user: users.find((user: UserFromServer) => user.id === todo.userId),
    };
  });
};
