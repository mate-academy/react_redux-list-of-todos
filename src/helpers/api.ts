const API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api';
const PATH_USERS = '/users.json';
const PATH_TODOS = '/todos.json';

const getAllInfo = <T>(url: string): Promise<T[]> => {
  return fetch(API_URL + url)
    .then(response => response.json());
};

export const getUsers = (): Promise<User[]> => {
  return getAllInfo<User>(PATH_USERS);
};

export const getTodos = (): Promise<Todo[]> => {
  return getAllInfo<Todo>(PATH_TODOS);
};
