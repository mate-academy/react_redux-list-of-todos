import { FilterStatus } from '../types/FilterStatus';
import { FilterType } from '../types/FilterType';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (filter: FilterType, todos: Todo[]) => {
  const { query, status } = filter;

  return todos
    .filter(todo =>
      todo.title.toLowerCase().trim().includes(query.toLowerCase().trim()),
    )
    .filter(({ completed }) => {
      switch (status) {
        case FilterStatus.Active:
          return !completed;

        case FilterStatus.Completed:
          return completed;

        default:
          return true;
      }
    });
};
