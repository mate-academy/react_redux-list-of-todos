import { Todo } from '../types/Todo';
import { Status } from '../types/Status';

export const filterTodos = (
  todos: Todo[],
  status: Status,
  query: string,
): Todo[] => {
  if (status === Status.All && query === '') {
    return todos;
  }

  return todos.filter(todo => {
    const matchesStatus =
      status === Status.All ||
      (status === Status.Active && !todo.completed) ||
      (status === Status.Completed && todo.completed);

    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());

    return matchesStatus && matchesQuery;
  });
};
