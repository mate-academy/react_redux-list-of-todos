import { BASE_URL } from './baseUrl';

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(`${BASE_URL}/todos`);

  return response.json();
}

export async function deleteTodoFromServer(todoId: number): Promise<Todo[]> {
  const response = await fetch(`${BASE_URL}/todos/${todoId}`, { method: 'DELETE' });

  return response.json();
}
