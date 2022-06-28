import { Todo, User } from '../react-app-env';

const API_URL = 'https://mate.academy/students-api';

export const getTodo = (): Promise<Todo[]> => {
  return fetch(`${API_URL}/todos`)
    .then(response => {
      if (!response.ok) {
        throw new Error('User Error');
      }

      return response.json();
    });
};

export const getUserById = (id: number): Promise<User> => {
  return fetch(`${API_URL}/users/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('User Error');
      }

      return response.json();
    });
};
