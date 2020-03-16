import { Todo, User } from './types';

const URL = 'https://jsonplaceholder.typicode.com/';

export async function loadData<T>(url: string): Promise<T> {
  return fetch(url)
    .then(response => response.json());
}

export async function loadTodos(): Promise<Todo[]> {
  return fetch(`${URL}todos`)
    .then(response => response.json());
}

export async function loadUsers(): Promise<User[]> {
  return fetch(`${URL}users`)
    .then(response => response.json());
}
