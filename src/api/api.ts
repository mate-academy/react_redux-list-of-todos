import { Todo } from '../types/Todo';
import { User } from '../types/User';

const BASE_URL = 'https://mate.academy/students-api';

export const request = (endpoint: string) => (
  fetch(`${BASE_URL}${endpoint}`)
    .then(response => response.json())
);

export const getTodosFromServer = (): Promise<Todo[]> => request('/todos');

export const getUserByIdFromServer = (userId: number): Promise<User> => request(`/users/${userId}/`);
