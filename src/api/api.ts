import { Todo, Users } from '../interfaces';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const getUsers = (): Promise<Users[]> => {
  return fetch(`${API_URL}/users`)
    .then(response => response.json());
};

export const getTodos = (): Promise<Todo[]> => {
  return fetch(`${API_URL}/todos`)
    .then(response => response.json());
};
