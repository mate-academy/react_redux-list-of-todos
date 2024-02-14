import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export function prepareTodos(
  listOfTodos: Todo[],
  filterField: string,
  debouncedQuery: string,
) {
  let preparedTodos = [...listOfTodos];

  preparedTodos = preparedTodos.filter(todo => {
    switch (filterField) {
      case Status.Active:
        return !todo.completed;

      case Status.Completed:
        return todo.completed;

      default:
        return todo;
    }
  });

  if (debouncedQuery) {
    const queryNormalize = debouncedQuery.toLowerCase();

    preparedTodos = preparedTodos
      .filter(todo => todo.title.toLowerCase().includes(queryNormalize));
  }

  return preparedTodos;
}
