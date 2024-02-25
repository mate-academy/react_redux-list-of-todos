import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

enum SortBy {
  Active = 'active',
  Completed = 'completed',
}

export const filterTodos = (
  query: string,
  status: Status,
  todos: Todo[],
) => {
  return todos.filter((todo) => {
    const prevQuery = query.toLowerCase().trim();
    const searchQuery = todo.title.toLowerCase().includes(prevQuery);

    switch (status) {
      case SortBy.Active:
        return searchQuery && !todo.completed;

      case SortBy.Completed:
        return searchQuery && todo.completed;

      default:
        return searchQuery;
    }
  });
};
