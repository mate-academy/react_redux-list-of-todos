import { Todo } from '../types/todo';
import { User } from '../types/user';

export function fetchTodos(): Promise<Todo[]> {
  return fetch('https://mate.academy/students-api/todos')
    .then(response => response.json())
    .then(responce => {
      if (responce.Error) {
        throw new Error(`${responce.status} - ${responce.statusText}`);
      }

      return responce;
    });
}

export const fetchUser = (userId: number): Promise<User> => {
  return fetch(`https://mate.academy/students-api/users/${userId}`)
    .then(response => response.json())
    .then(responce => {
      if (responce.Error) {
        throw new Error(`${responce.status} - ${responce.statusText}`);
      }

      return responce;
    });
};
