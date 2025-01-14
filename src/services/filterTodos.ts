import { Todo } from '../types/Todo';
import { Filter } from '../types/filter';
import { Status } from '../types/Status';

export const handleFilter = (todos: Todo[], filters: Filter) => {
  return todos
    .filter(todo => {
      switch (filters.status) {
        case Status.Active:
          return !todo.completed;

        case Status.Completed:
          return todo.completed;

        case Status.All:
          return true;

        default:
          return true;
      }
    })
    .filter(todo =>
      todo.title.toLowerCase().includes(filters.query.toLowerCase()),
    );
};
