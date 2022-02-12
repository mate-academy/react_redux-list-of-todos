const TODO_API = 'https://mate.academy/students-api/todos';

export function getTodos(): Promise<Todo[]> {
  return fetch(TODO_API)
    .then(response => response.json());
}
