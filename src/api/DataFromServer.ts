const URL_API_USER = 'https://jsonplaceholder.typicode.com/users';
const URL_API_TODO = 'https://jsonplaceholder.typicode.com/todos';

export function getUsers(): Promise<User[]> {
  return fetch(URL_API_USER)
    .then(respone => respone.json());
}

export function getTodos(): Promise<Todo[]> {
  return fetch(URL_API_TODO)
    .then(respone => respone.json());
}
