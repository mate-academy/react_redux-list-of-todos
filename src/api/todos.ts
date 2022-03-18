const TODO_API = 'https://mate.academy/students-api/todos';

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(TODO_API);

  return response.json();
}
