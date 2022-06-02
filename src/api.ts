import { Todo } from './types/Todo';
import { User } from './types/User';

const API_URL = 'https://mate.academy/students-api/';

export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${API_URL}/todos`);

  return response.json();
};

export const getUser = async (id: number): Promise<User> => {
  const response = await fetch(`${API_URL}/users/${id}`);

  return response.json();
};
