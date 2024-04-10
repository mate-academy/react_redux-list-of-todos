import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export function filterTodos(
  todos: Todo[],
  filter: { query: string; status: Status },
) {
  const { status, query } = filter;

  return todos.filter((value: Todo): boolean => {
    if (!value.title.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }

    switch (status) {
      case 'active':
        return !value.completed;

      case 'completed':
        return value.completed;

      case 'all':
      default:
        return true;
    }
  });
}
