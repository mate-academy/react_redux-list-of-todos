import { Todo, User } from '../react-app-env';

const API_URL = 'https://mate.academy/students-api';

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(`${API_URL}/todos`);

  return response.json();
}

export async function getUserById(userId: number): Promise<User> {
  const response = await fetch(`${API_URL}/users/${userId}`);

  return response.json();
}

export async function getTodosByStatus(status: string): Promise<Todo[]> {
  if (status === 'true' || status === 'false') {
    const response = await fetch(`${API_URL}/todos?completed=${status}`);

    return response.json();
  }

  return getTodos();
}

export const remove = (todoId: number) => {
  return fetch(`${API_URL}/todos/${todoId}`, { method: 'DELETE' });
};
