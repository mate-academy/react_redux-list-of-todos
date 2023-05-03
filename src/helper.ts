import { Todo } from './types/Todo';
import { Status } from './types/Status';

export function getVisibleTodos(
  todos: Todo[],
  filterType: Status,
  query: string,
): Todo[] {
  return todos.filter(todo => {
    const lowerQuery = query.toLowerCase();
    const lowerTitle = todo.title.toLowerCase();

    switch (filterType) {
      case 'active':
        return query
          ? lowerTitle.includes(lowerQuery) && !todo.completed
          : !todo.completed;

      case 'completed':
        return query
          ? lowerTitle.includes(lowerQuery) && todo.completed
          : todo.completed;

      default:
        return query
          ? lowerTitle.includes(lowerQuery)
          : todo;
    }
  });
}
