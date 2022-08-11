import { Todo } from './types/Todo';
import { User } from './types/User';

const BASE_URL = 'https://mate.academy/students-api';

function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function get<T>(url: string): Promise<T> {
  return wait(1000)
    .then(() => fetch(BASE_URL + url))
    .then(res => res.json());
}

export const getTodos = () => {
  return get<Todo[]>('/todos');
};

export const getUser = (id: number): Promise<User> => {
  return get<User>(`/users/${id}`);
};
