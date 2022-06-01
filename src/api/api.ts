import { Todo } from '../types/Todo';
import { User } from '../types/User';

const BASE_URL = 'https://mate.academy/students-api';

const request = async (url: string) => {
  const response = await fetch(`${BASE_URL}${url}`);

  return response.json();
};

export const getTodos = (): Promise<Todo[]> => {
  return request('/todos');
};

export const getUser = (userId: number): Promise<User> => {
  return request(`/users/${userId}`);
};
