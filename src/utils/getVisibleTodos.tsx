import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getVisibleTodos = (
  todos: Todo[],
  status: Status,
  query: string,
) => {
  const normalizeTitle = (title: string) => title
    .toLowerCase().includes(query.toLowerCase());

  switch (status) {
    case Status.Active:
      return todos.filter(
        todo => !todo.completed && normalizeTitle(todo.title),
      );

    case Status.Completed:
      return todos.filter(todo => todo.completed && normalizeTitle(todo.title));

    default:
      return todos.filter(todo => normalizeTitle(todo.title));
  }
};
