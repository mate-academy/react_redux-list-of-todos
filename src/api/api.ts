import { Todo, User } from '../react-app-env';

const BASE_API = 'https://mate.academy/students-api';

export const getTodos = async (): Promise<Todo[]> => {
  const resporse = await fetch(`${BASE_API}/todos`);

  return resporse.json();
};

export const getUser = async (userId: number): Promise<User> => {
  const response = await fetch(`${BASE_API}/users/${userId}`);

  return response.json();
};
