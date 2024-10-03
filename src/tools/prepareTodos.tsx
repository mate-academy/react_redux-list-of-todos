import { Todo } from '../types/Todo';
import { Status } from './constants';

export const prepareTodos = (
  readyTodos: Todo[],
  query: string,
  status: string,
) => {
  return readyTodos.filter((todo: Todo) => {
    const titleCondition = todo.title
      .toLowerCase()
      .includes(query.toLowerCase());

    if (status) {
      switch (status) {
        case Status.ALL:
          return titleCondition;

        case Status.ACTIVE:
          return titleCondition && !todo.completed;

        case Status.COMPLETED:
          return titleCondition && todo.completed;

        default:
          return titleCondition;
      }
    }

    return titleCondition;
  });
};
