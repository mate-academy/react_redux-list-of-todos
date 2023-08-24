import { Todo } from './types/Todo';
import { User } from './types/User';

const BASE_URL = 'https://mate-academy.github.io/'
  + 'react_dynamic-list-of-todos/api';

function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

async function get<T>(url: string): Promise<T> {
  const fullURL = `${BASE_URL}${url}.json`;

  await wait(1000);
  const res = await fetch(fullURL);

  return res.json();
}

export const getTodos = () => get<Todo[]>('/todos');

export const getUser = (userId: number) => get<User>(`/users/${userId}`);
