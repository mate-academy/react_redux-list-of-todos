import { Todo, User } from '../react-app-env';

const BASE_URL = 'https://mate.academy/students-api';

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(`${BASE_URL}/todos`);

  return response.json();
}

export async function getUser(id: number): Promise<User> {
  const response = await fetch(`${BASE_URL}/users/${id}`);

  return response.json();
}
