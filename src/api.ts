export const API_URL = 'https://mate.academy/students-api';

export function request(query: string, method = {}) {
  return fetch(`${API_URL}${query}`, method)
    .then(response => response.json());
}

export const getTodos = (): Promise<Todo[]> => request('/todos');

export const getUserById = (userId: number): Promise<User> => request(`/users/${userId}`);

export const deleteTodoById = (todoId: number): Promise<number> => request(`todos/${todoId}`, { method: 'DELETE' });
