import { Todo } from '../types/Todo';
import { Status } from '../types/Status';

export const filterTodos = (
  todos: Todo[],
  query: string,
  status: Status,
): Todo[] => {
  return todos.filter(todo => {
    if (!query && status === Status.All) {
      return true;
    }

    switch (status) {
      case Status.Active:
        if (todo.completed) {
          return false;
        }

        break;
      case Status.Completed:
        if (!todo.completed) {
          return false;
        }

        break;
    }

    return todo.title.toLowerCase().includes(query.toLowerCase());
  });
};
