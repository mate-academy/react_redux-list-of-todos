import { Todo, User } from '../react-app-env';

const API_URL = 'https://mate.academy/students-api';

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(`${API_URL}/todos`);

  return response.json();
}

export async function getUserById(userId: number | undefined): Promise<User> {
  const response = await fetch(`${API_URL}/users/${userId}`);

  return response.ok
    ? response.json()
    // eslint-disable-next-line prefer-promise-reject-errors
    : Promise.reject(`${response.status}: ${response.statusText}`);
}

export async function deleteTodoById(id: number) {
  await fetch(`${API_URL}/todos/${id}`, { method: 'DELETE' });
}
