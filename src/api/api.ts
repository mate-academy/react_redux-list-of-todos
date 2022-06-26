import { Todo, User } from '../react-app-env';

const API_URL = 'https://mate.academy/students-api';

export async function getAllTodos(): Promise<Todo[]> {
  const response = await fetch(`${API_URL}/todos`);

  return response.json();
}

export async function getUser(userId: number): Promise<User> {
  const response = await fetch(`${API_URL}/users/${userId}`);

  return response.json();
}

export async function getUserById(userId: number): Promise<User> {
  const response = await fetch(`${API_URL}/users/${userId}`);

  return response.json();
}
