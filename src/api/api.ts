import { Todo } from '../types/todo';
import { User } from '../types/user';

const BASE_URL = 'https://mate.academy/students-api';

const request = (endpoint: string, options = {}) => {
  return fetch(BASE_URL + endpoint, options)
    .then(response => response.json())
    .then(data => {
      if (data.Error) {
        throw new Error(`${data.status} - ${data.statusText}`);
      }

      return data;
    });
};

export const fetchTodos = (): Promise<Todo[]> => request('/todos');
export const fetchUserById = (userId: number): Promise<User> => request(`/users/${userId}`);
export const removeTodo = (todoId: number): Promise<number> => request(`/todos/${todoId}`, {
  method: 'DELETE',
});
