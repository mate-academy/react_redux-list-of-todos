import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (
  todos: Todo[],
  query: string,
  status: Status,
): Todo[] => {
  const normalizedQuery = query.toLowerCase();

  return todos.filter((todo) => {
    const normalizedTodoTitle = todo.title.toLowerCase();
    const isSearchQueryMatch = normalizedTodoTitle.includes(normalizedQuery);

    switch (status) {
      case Status.ACTIVE:
        return isSearchQueryMatch && !todo.completed;
      case Status.COMPLETED:
        return isSearchQueryMatch && todo.completed;
      default:
        return isSearchQueryMatch;
    }
  });
};
