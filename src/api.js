const Url = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api/';

export const getTodos = () => {
  return fetch(`${Url}todos.json`).then(response => response.json());
};

export const getUsers = () => {
  return fetch(`${Url}users.json`).then(response => response.json());
};
