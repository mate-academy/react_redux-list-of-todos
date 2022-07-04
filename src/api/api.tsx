/* eslint-disable no-console */
const TODOS_URL = 'https://mate.academy/students-api/todos';
const USERS_URL = 'https://mate.academy/students-api/users';

export const requestTodos = async (): Promise<Todo[]> => {
  const response = await fetch(TODOS_URL);

  return response.json();
};

export const requestUser = async (userId: number): Promise<User> => {
  const response = await fetch(`${USERS_URL}/${userId}`);

  return response.json();
};
