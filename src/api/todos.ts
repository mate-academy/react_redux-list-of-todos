import { Todo } from '../react-app-env';

const API_URL = 'https://mate.academy/students-api/todos';

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(API_URL);

  return response.json();
}

export async function deleteTodos(todoId: number): Promise<Todo[]> {
  await fetch(`${API_URL}/${todoId}`, {
    method: 'DELETE',
  });

  return getTodos();
}
