import { User, Todo } from '../react-app-env';

const apiUrl = 'https://mate.academy/students-api';

export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${apiUrl}/todos`);

  return response.json();
};

export const getUser = async (id: number): Promise<User> => {
  const response = await fetch(`${apiUrl}/users/${id}`);

  return response.json();
};
