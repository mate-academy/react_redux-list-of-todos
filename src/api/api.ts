const BASE_URL = 'https://mate.academy/students-api';

const request = (url: string) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => response.json());
};

export const getTodos = () :Promise<Todo[]> => request('/todos/');

export const getUserById = (userId: number): Promise<User> => request(`/users/${userId}`);
