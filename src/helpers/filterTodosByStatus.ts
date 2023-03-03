import { StatusFilter } from '../enums/StatusFilter';
import { Todo } from '../types/Todo';

export const filterTodosByStatus = (
  todos: Todo[],
  filterStatus: StatusFilter,
): Todo[] => {
  if (filterStatus === StatusFilter.ALL) {
    return todos;
  }

  return todos.filter(({ completed }) => {
    switch (filterStatus) {
      case StatusFilter.ACTIVE:
        return !completed;

      case StatusFilter.COMPLETED:
        return completed;

      default:
        return true;
    }
  });
};
