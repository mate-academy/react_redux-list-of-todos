import { FilterStatusType } from '../types/Status';
import { Todo } from '../types/Todo';

export const filterTodos = (
  todos: Todo[],
  query: string,
  status: FilterStatusType,
) => {
  return todos.filter(todo => {
    const condition1 = todo.title
      .toLowerCase()
      .includes(query.toLowerCase());

    switch (status) {
      case FilterStatusType.all:
        return condition1;
      case FilterStatusType.active:
        return condition1 && !todo.completed;
      case FilterStatusType.completed:
        return condition1 && todo.completed;
      default:
        return true;
    }
  });
};
