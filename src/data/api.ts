import { BASE_URL } from './api.constants';

export const getData = <T>(endpoint: string): Promise<T> => (
  fetch(`${BASE_URL}${endpoint}`).then(res => res.json())
);

// export const getTodos = () => {
//   return fetch(`${BASE_URL}/todos`)
//     .then((response) => response.json());
// };

// export const getUsers = () => {
//   return fetch(`${BASE_URL}/users`)
//     .then((response) => response.json());
// };

// export const getUser = (id: number) => {
//   return fetch(`${BASE_URL}/users/${id}`)
//     .then((response) => response.json());
// };
