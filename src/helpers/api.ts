import { API_URL } from '../constants';

export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${API_URL}/todos.json`);

  return response.json();
};

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_URL}/users.json`);

  return response.json();
};
