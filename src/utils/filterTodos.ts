import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export function filterTodos(todosArray: Todo[], query: string, status: Status) {
  return todosArray
    .filter(todo =>
      todo.title.toLowerCase().includes(query.trim().toLowerCase()),
    )
    .filter(todo => {
      switch (status) {
        case Status.Completed:
          return todo.completed;
        case Status.Active:
          return todo.completed === false;
        default:
          return true;
      }
    });
}
