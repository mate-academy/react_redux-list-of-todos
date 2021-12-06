export const BASE_URL = 'https://mate.academy/students-api';

export const request = (url: string) => {
  return fetch(`${BASE_URL}/${url}`)
    .then(response => response.json());
};

export const getTodos = (): Promise<Todo[]> => request('todos');
export const getCurrentUser = (id: number | undefined): Promise<User> => request(`users/${id}`);
