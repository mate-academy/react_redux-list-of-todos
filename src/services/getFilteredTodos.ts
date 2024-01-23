import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const filterTodos = (
  todos: Todo[],
  query: string,
  status: Status,
): Todo[] => {
  return todos.filter(todo => {
    const correctedQuery = query.trim().toLowerCase();
    const searchQuery = todo.title.toLowerCase().includes(correctedQuery);

    switch (status) {
      case 'all':
        return searchQuery;
      case 'active':
        return searchQuery && !todo.completed;
      case 'completed':
        return searchQuery && todo.completed;
      default:
        return searchQuery;
    }
  });
};
