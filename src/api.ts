import { Todo, User } from './react-app-env';

const url = 'https://mate.academy/students-api';

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(`${url}/todos`);

  return response.json();
}

export async function getUser(userId: number): Promise<User> {
  const response = await fetch(`${url}/users/${userId}`);

  return response.json();
}
