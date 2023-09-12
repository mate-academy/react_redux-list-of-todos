import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const todosFilteredByStatus = (todos: Todo[], todoStatus: Status) => {
  switch (todoStatus) {
    case Status.All:
      return todos;

    case Status.Active:
      return todos.filter(todo => !todo.completed);

    case Status.Completed:
      return todos.filter(todo => todo.completed);

    default:
      return todos;
  }
};

export const todosFilterdByQuery = (todos: Todo[], todoQuery: string) => {
  const normQuery = todoQuery.toLowerCase().trim();

  return todos.filter(todo => todo.title.toLowerCase().includes(normQuery));
};
