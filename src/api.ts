import { Todo, User } from './react-app-env';

export const API_URL_TODOS = 'https://mate.academy/students-api/todos';
export const API_URL_USERS = 'https://mate.academy/students-api';

export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch(API_URL_TODOS);

  return response.json();
};

export const getUsers = async (id: number): Promise<User> => {
  const res = await fetch(`${API_URL_USERS}/users/${id}`);
  const dataUsers = res.json();

  return dataUsers;
};
