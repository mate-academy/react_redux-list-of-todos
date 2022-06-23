const BASE_URL = 'https://mate.academy/students-api';

const request = (url: string) => fetch(`${BASE_URL}${url}`)
  .then(resp => resp.json());

export const getTodos = () => request('/todos');

export const getUserDetails = (userId: number | null) => request(`/users/${userId}`);
