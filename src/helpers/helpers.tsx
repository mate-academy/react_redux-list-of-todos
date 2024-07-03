import { FilterState } from '../features/filter';
import { Todo } from '../types/Todo';

export const filterTodos = (
  todos: Todo[],
  { query, status }: FilterState,
): Todo[] => {
  return todos.filter(todo => {
    const preparedQuery = query
      .toLowerCase()
      .split(' ')
      .filter(Boolean)
      .join(' ');

    const isQueryInTitle = todo.title.toLowerCase().includes(preparedQuery);

    switch (status) {
      case 'completed':
        return todo.completed && isQueryInTitle;

      case 'active':
        return !todo.completed && isQueryInTitle;

      default:
        return isQueryInTitle;
    }
  });
};
