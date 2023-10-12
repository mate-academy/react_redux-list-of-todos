import axios, { AxiosResponse } from 'axios';
import { Todo } from './types/Todo';
import { User } from './types/User';

// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

function fetchData<T>(directory: string): Promise<AxiosResponse<T>> {
  const fullURL = `${BASE_URL}/${directory}.json`;

  return axios.get(fullURL);
}

export const fetchTodos = () => fetchData<Todo[]>('todos');
export const fetchUsers = (userId: number) => fetchData<User>(`users/${userId}`);

function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function get<T>(url: string): Promise<T> {
  // eslint-disable-next-line prefer-template
  const fullURL = BASE_URL + url + '.json';

  return wait(300)
    .then(() => fetch(fullURL))
    .then(res => res.json());
}

export const getUser = (userId: number) => get<User>(`/users/${userId}`);
