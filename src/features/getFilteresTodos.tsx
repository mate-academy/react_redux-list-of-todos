import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (
  todos: Todo[],
  status: Status,
  query: string,
) => {
  return todos
    .filter(todo =>
      todo.title.toLowerCase().includes(query.trim().toLowerCase()),
    )
    .filter(({ completed }) => {
      switch (status) {
        case Status.Active:
          return !completed;

        case Status.Completed:
          return completed;

        default:
          return todos;
      }
    });
};
