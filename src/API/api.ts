import { User } from '../types/User';
import { Todo } from '../types/Todo';

const BASE_URL = 'https://mate.academy/students-api';

export const request = (url: string, options?: RequestInit) => {
  return fetch(`${BASE_URL}${url}`, options)
    .then(res => {
      if (!res.ok) {
        throw new Error(`${res.status} - ${res.statusText}`);
      }

      return res.json();
    });
};

export const getTodos = (): Promise<Todo[]> => {
  return request('/todos');
};

export const getUserById = (id: number): Promise<User> => {
  return request(`/users/${id}`);
};
