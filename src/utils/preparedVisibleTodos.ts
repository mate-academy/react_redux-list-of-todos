import { Todo } from '../types/Todo';
import { Status } from '../types/Status';

export function preparedVisibleTodos(
  todos: Todo[],
  query: string,
  status: Status,
): Todo[] {
  const normalizedQuery = query.trim().toLowerCase();
  let visibleTodos = [...todos];

  if (query) {
    visibleTodos = visibleTodos.filter(todo =>
      todo.title.toLowerCase().includes(normalizedQuery),
    );
  }

  if (status === Status.Active) {
    visibleTodos = visibleTodos.filter(todo => !todo.completed);
  }

  if (status === Status.Completed) {
    visibleTodos = visibleTodos.filter(todo => todo.completed);
  }

  return visibleTodos;
}
