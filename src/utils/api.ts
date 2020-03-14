import { USERS_URL, TODOS_URL } from '../constants/urls';

export async function getData <T>(url: string): Promise<T> {
  const response = await fetch(url);

  return response.json();
}

export const getUsers = async (): Promise<User[]> => {
  return getData<User[]>(USERS_URL);
};

export const getTodos = async (): Promise<Todo[]> => {
  return getData<Todo[]>(TODOS_URL);
};
