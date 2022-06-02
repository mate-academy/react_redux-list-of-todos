import { User } from '../types/User';
import { Todo } from '../types/Todo';

const BASE_URL = 'https://mate.academy/students-api';

export const getTodosFromServer = async (): Promise<Todo[]> => {
  const response = await fetch(`${BASE_URL}/todos`);

  return response.json();
};

export const getUserFromServer = async (id: number): Promise<User> => {
  const response = await fetch(`${BASE_URL}/users/${id}`);

  return response.json();
};
