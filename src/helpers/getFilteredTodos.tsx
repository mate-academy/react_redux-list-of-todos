import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getfilteredTodos = (todos: Todo[], filter: string) => (
  todos.filter(({ completed }) => {
    switch (filter) {
      case Status.All:
        return true;

      case Status.Active:
        return !completed;

      case Status.Completed:
        return completed;

      default:
        return 0;
    }
  })
);
