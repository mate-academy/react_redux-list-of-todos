import { Status } from '../enums/Status';
import { Filters } from '../../types/Filters';
import { Todo } from '../../types/Todo';

export const getPreparedTodos = (
  todos: Todo[],
  { query, status }: Filters,
): Todo[] => {
  let preparedTodos = [...todos];

  if (query) {
    const prepearedQuery = query.trim().toLowerCase();

    preparedTodos = preparedTodos.filter(todo =>
      todo.title.toLowerCase().includes(prepearedQuery),
    );
  }

  if (status) {
    preparedTodos = preparedTodos.filter(todo => {
      switch (status) {
        case Status.Active:
          return !todo.completed;

        case Status.Completed:
          return todo.completed;

        default:
          return todo;
      }
    });
  }

  return preparedTodos;
};
