import { Todo } from '../types/Todo';
import { Status as currentStatus } from './status';

export const prepareTodos = (todos: Todo[], query: string, status: string) => {
  return todos.filter((todo: Todo) => {
    const title = todo.title
    .toLowerCase()
    .includes(query.toLowerCase());

    if (status) {
      switch (status) {
        case currentStatus.ALL:
          return title;
        case currentStatus.ACTIVE:
          return title && !todo.completed;
        case currentStatus.COMPLETED:
          return title && todo.completed;
        default:
          return title;
      }
    }

    return title;
  });
};
