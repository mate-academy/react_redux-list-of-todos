import { Todo } from '../types/Todo';

export function getPreparedTodos(
  todos: Todo[],
  { query, status }: { query: string; status: string },
) {
  let preparedTodos = [...todos];
  const normalizeQuery = query.toLowerCase();

  if (query) {
    preparedTodos = preparedTodos.filter(todo =>
      todo.title.toLowerCase().includes(normalizeQuery),
    );
  }

  if (status) {
    switch (status) {
      case 'active':
        return preparedTodos.filter(todo => !todo.completed);

      case 'completed':
        return preparedTodos.filter(todo => todo.completed);

      default:
        return preparedTodos;
    }
  }

  return preparedTodos;
}
