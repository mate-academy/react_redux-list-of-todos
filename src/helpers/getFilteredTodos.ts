import { Todo } from '../types/Todo';

export function getFilteredTodos(
  todos: Todo[],
  serchParams: { query: string, status: string },
): Todo[] {
  const { query, status } = serchParams;

  const queryNormalize = query.trim().toLowerCase();
  const statusNormalize = status.trim().toLowerCase();

  const newTodos = queryNormalize.length
    ? todos.filter(todo => todo.title.toLowerCase().includes(queryNormalize))
    : todos;

  switch (statusNormalize) {
    case 'active':
      return newTodos.filter(todo => !todo.completed);
    case 'completed':
      return newTodos.filter(todo => todo.completed);
    default:
      return newTodos;
  }
}
