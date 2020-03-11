import { TodoType, UserType } from './types';

const API_URL = 'https://jsonplaceholder.typicode.com/';

async function getData<T>(url: string): Promise<T> {
  const response = await fetch(url);

  return response.json();
}

export const getUsers = () => {
  return getData<UserType[]>(`${API_URL}users`);
};

export const getTodos = () => {
  return getData<TodoType[]>(`${API_URL}todos`);
};
