import { Todo, User } from './types';


const API_URL = 'https://jsonplaceholder.typicode.com/';

function loadData<T>(url: string): Promise<T> {
  return fetch(url)
    .then(res => res.json());
}

export const loadTodos = loadData<Todo[]>(`${API_URL}todos`);
export const loadUsers = loadData<User[]>(`${API_URL}users`);
