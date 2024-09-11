import { Filters } from '../types/Filters';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (todos: Todo[], selectedFilters: Filters) => {
  const loweredQuery = selectedFilters.query.toLowerCase();

  return todos.filter(todo => {
    if (loweredQuery) {
      if (!todo.title.toLowerCase().includes(loweredQuery)) {
        return false;
      }
    }

    if (selectedFilters.status !== 'all') {
      return selectedFilters.status === 'completed'
        ? todo.completed
        : !todo.completed;
    }

    return true;
  });
};
