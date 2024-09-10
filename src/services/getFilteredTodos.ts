import { Filters } from '../types/Filters';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (todos: Todo[], selectedFilters: Filters) => {
  return todos
    .filter(todo =>
      todo.title.toLowerCase().includes(selectedFilters.query.toLowerCase()),
    )
    .filter(todo => {
      if (selectedFilters.status === 'all') {
        return true;
      }

      return selectedFilters.status === 'completed'
        ? todo.completed
        : !todo.completed;
    });
};
