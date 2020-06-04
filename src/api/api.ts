const BASE_URL = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api';
const TODOS_URL = `${BASE_URL}/todos.json`;
const USERS_URL = `${BASE_URL}/users.json`;

export const getData = async () => {
  const [todos, users] = await Promise.all([
    await fetch(`${TODOS_URL}`),
    await fetch(`${USERS_URL}`),
  ]);

  const preparedTodos: Todo[] = await todos.json();
  const preparedUsers: User[] = await users.json();

  return preparedTodos.map(todo => ({
    ...todo,
    user: preparedUsers.find(user => todo.userId === user.id),
  }));
};
