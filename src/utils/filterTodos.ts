import { Todo } from '../types/Todo';
import { Status } from '../types/Status';

export const filterTodos = (
  todos: Todo[],
  query: string,
  status: Status,
): Todo[] => {
  return todos
    .filter(todo => {
      if (status === Status.Active) {
        return !todo.completed;
      }

      if (status === Status.Completed) {
        return todo.completed;
      }

      return true;
    })
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
};
