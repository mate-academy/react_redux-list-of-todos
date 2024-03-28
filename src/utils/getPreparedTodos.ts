import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getPreparedTodos = (
  query: string,
  filter: Status,
  todos: Todo[],
): Todo[] => {
  const normalizedQuery = query.toLowerCase();

  return todos.filter(todo => {
    const title = todo.title.toLowerCase();

    if (!title.includes(normalizedQuery)) {
      return false;
    }

    switch (filter) {
      case 'all':
        return true;

      case 'active':
        return !todo.completed;

      case 'completed':
        return todo.completed;

      default:
        return false;
    }
  });
};
