const API_URL = 'https://mate.academy/students-api/';

const request = (endpoint: string) => {
  return fetch(`${API_URL}/${endpoint}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
};

export const getTodos = (): Promise<Todo[]> => request('todos');

export const getUserById = (userId: number): Promise<User> => request(`users/${userId}`);
