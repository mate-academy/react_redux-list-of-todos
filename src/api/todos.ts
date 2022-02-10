import { Todo } from '../react-app-env';

const API_URL = 'https://mate.academy/students-api/todos';

export async function getAllTodos(): Promise<Todo[]> {
  const response = await fetch(API_URL);

  return response.json();
}
