import { Todo } from '../react-app-env';

const API_URL = 'https://mate.academy/students-api/todos';

export async function getTodos(): Promise<Todo[]> {
  const responce = await fetch(API_URL);

  return responce.json();
}
