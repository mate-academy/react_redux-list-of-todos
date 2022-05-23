import { Todo } from '../types/Todo';
import { User } from '../types/User';

const BASE_URL = 'https://mate.academy/students-api';

export const getTodos = (): Promise<Todo[]> => {
  return fetch(`${BASE_URL}/todos`)
    .then(response => response.json());
};

export const getUser = (id: number): Promise<User> => {
  return fetch(`${BASE_URL}/users/${id}`)
    .then(response => response.json());
};
