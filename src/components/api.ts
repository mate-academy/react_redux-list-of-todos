import { Todo, User } from './types';

const API_URL = 'https://mate.academy/students-api/';
const API_USERS = 'https://mate.academy/students-api/users/';

export function getTodos(url: string): Promise<Todo[]> {
  return fetch(`${API_URL}${url}`)
    .then(res => res.json());
}

export function getUsers(url: string): Promise<User[]> {
  return fetch(`${API_URL}${url}`)
    .then(res => res.json());
}

export function getUser(url: number): Promise<User> {
  return fetch(`${API_USERS}${url}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`${res.status} - ${res.statusText}`);
      }

      return res.json();
    });
}
