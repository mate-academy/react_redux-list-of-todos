import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (
  todos: Todo[],
  filter: Status,
  query: string,
) => {
  return todos
    .filter(({ completed }) => {
      switch (filter) {
        case Status.Active:
          return !completed;
        case Status.Completed:
          return completed;
        default:
          return true;
      }
    })
    .filter(({ title }) =>
      title.toLowerCase().includes(query.toLowerCase().trim()),
    );
};
