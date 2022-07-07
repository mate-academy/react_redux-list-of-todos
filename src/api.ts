const BASE_URL = 'https://mate.academy/students-api';

const request = (url: string) => fetch(`${BASE_URL}${url}`)
  .then(res => res.json());

export const getTodos = (): Promise<Todo[]> => request('/todos');
export const getUsers = (userId: number): Promise<User | null> => request(`/users/${userId}`);
