import { Todo } from '../types/Todo';
import { Status } from '../types/Status';

export const filterTodos = (
  todos: Todo[],
  status: Status,
  query: string,
): Todo[] => (
  todos.filter((todo) => {
    if (!todo.title.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }

    switch (status) {
      case Status.ACTIVE:
        return !todo.completed;
      case Status.COMPLETED:
        return todo.completed;
      case Status.ALL:
      default:
        break;
    }

    return true;
  })
);
