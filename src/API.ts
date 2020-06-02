const API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

export const getTODOs = () => {
  return fetch(`${API_URL}/todos.json`)
    .then(response => response.json());
};

export const getUsers = () => {
  return fetch(`${API_URL}/users.json`)
    .then(response => response.json());
};
