import { Todo } from './types/Todo';

const BASE_URL =
  'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

const wait = (delay: number) =>
  new Promise(resolve => {
    setTimeout(resolve, delay);
  });

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(`${BASE_URL}/todos.json`);

  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }

  await wait(500);

  return response.json();
}

export async function getUser(userId: number): Promise<{ name: string }> {
  const response = await fetch(`${BASE_URL}/users/${userId}.json`);

  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }

  await wait(500);

  return response.json();
}
