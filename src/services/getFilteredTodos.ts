import { Filters } from '../types/Filters';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (todos: Todo[], selectedFilters: Filters) => {
  const loweredQuery = selectedFilters.query.toLowerCase();

  return todos.filter(todo => {
    if (loweredQuery) {
      if (!todo.title.toLowerCase().includes(loweredQuery)) {
        return false;
      }
    }

    if (selectedFilters.status !== Status.All) {
      return selectedFilters.status === Status.Completed
        ? todo.completed
        : !todo.completed;
    }

    return true;
  });
};
