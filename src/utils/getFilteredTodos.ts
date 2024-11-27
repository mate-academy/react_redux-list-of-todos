import { Todo } from '../types/Todo';
import { FilterState } from '../features/filter';

export const getFilteredTodos = (
  todos: Todo[],
  filter: FilterState,
): Todo[] => {
  const { query, status } = filter;
  const normalizedQuery = query.toLowerCase().trim();

  return todos.filter(todo => {
    const hasQuery = todo.title.toLowerCase().includes(normalizedQuery);
    const requiredStatus = status === 'completed';
    const isMatchingStatus =
      status === 'all' ? true : todo.completed === requiredStatus;

    return hasQuery && isMatchingStatus;
  });
};
