import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

interface Options {
  [key: string]: string;
}

export const prepareTodos = (todos: Todo[], options: Options): Todo[] => {
  const { query, status } = options;
  let todosCopy = [...todos];

  if (query) {
    todosCopy = todosCopy.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (status) {
    todosCopy = todosCopy.filter(todo => {
      switch (status) {
        case Status.Active: {
          return !todo.completed;
        }

        case Status.Completed: {
          return todo.completed;
        }

        default:
          return true;
      }
    });
  }

  return todosCopy;
};
