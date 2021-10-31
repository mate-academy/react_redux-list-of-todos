export const API_URL = 'https://mate.academy/students-api';

export function getTodos(): Promise<Todo[]> {
  return fetch(`${API_URL}/todos`)
    .then(response => response.json())
    .then(todos => todos.sort((a: Todo, b: Todo) => a.userId - b.userId));
}

export function getCurrentUser(id: number): Promise<User> {
  return fetch(`${API_URL}/users/${id}`)
    .then(response => response.json())
    .catch(() => ({
      id: 0,
      name: '',
    }))
    .then(user => user);
}
