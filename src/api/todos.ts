import { Todo } from '../react-app-env';

const BASE_URL = 'https://mate.academy/students-api/todos';

export async function getTodos(): Promise<Todo[]> {
  const res = await fetch(BASE_URL);

  return res.json();
}

export async function deleteTodo(todoId: number): Promise<Todo[]> {
  const res = await fetch(`${BASE_URL}/${todoId}`, {
    method: 'DELETE',
  });

  return res.json();
}
