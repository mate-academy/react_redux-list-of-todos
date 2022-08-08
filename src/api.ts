import { Todo } from './types/Todo';
import { User } from './types/User';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

function get<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url)
    .then(res => res.json());
}

export const getTodos = (): Promise<Todo[]> => {
  return get('/todos');
};

export const getUser = (userId:number): Promise<User> => {
  return get(`/users/${userId}`);
};
