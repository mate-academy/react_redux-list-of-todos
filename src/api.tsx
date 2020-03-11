import { TodoType, UserType } from './interfaces';

const API_URL = 'https://jsonplaceholder.typicode.com/';

async function getData<T>(url: string): Promise<T> {
  const response = await fetch(url);

  return response.json();
}

export const getUsers = (): Promise<UserType[]> => {
  return getData(`${API_URL}users`);
};

export const getTodos = (): Promise<TodoType[]> => {
  return getData(`${API_URL}todos`);
};
