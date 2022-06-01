import { Todo, User } from '../types';

const API_URL = 'https://mate.academy/students-api';

function request(url: string) {
  return fetch(url)
    .then(response => response.json());
}

export const getTodos = ():Promise<Todo[]> => {
  return request(`${API_URL}/todos`);
};

export const getUsers = (id: number): Promise<User> => {
  return request(`${API_URL}/users/${id}`);
};
