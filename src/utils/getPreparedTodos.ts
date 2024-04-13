import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getPreparedTodos = (
  todos: Todo[],
  query: string,
  status: Status,
) => {
  let todosCopy = [...todos];

  if (query.trim()) {
    todosCopy = todosCopy.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (status) {
    todosCopy = todosCopy.filter(todo => {
      switch (status) {
        case Status.Active:
          return !todo.completed;
        case Status.Completed:
          return todo.completed;
        default:
          return todos;
      }
    });
  }

  return todosCopy;
};
