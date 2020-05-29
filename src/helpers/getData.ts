const API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api/';
const USERS_PATH = '/users.json';
const TODOS_PATH = '/todos.json';

export const getData = async () => {
  const [todos, users] = await Promise.all([
    await fetch(`${API_URL}${TODOS_PATH}`),
    await fetch(`${API_URL}${USERS_PATH}`),
  ]);

  const preparedTodos: Todo[] = await todos.json();
  const preparedUsers: User[] = await users.json();

  const preparedData = preparedTodos.map(todo => ({
    ...todo,
    user: preparedUsers.find(user => todo.userId === user.id) || '',
  }));

  return preparedData;
};
