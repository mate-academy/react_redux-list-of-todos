import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';

export function filterTodos(
  todos: Todo[],
  filter: { query: string, status: Status },
) {
  let preparedTodos = [...todos];

  if (filter.status !== Status.All) {
    switch (filter.status) {
      case Status.Active: {
        preparedTodos = preparedTodos.filter(todo => !todo.completed);
        break;
      }

      case Status.Completed: {
        preparedTodos = preparedTodos.filter(todo => todo.completed);
        break;
      }

      default: {
        return preparedTodos;
      }
    }
  }

  if (filter.query) {
    preparedTodos = preparedTodos.filter(
      (todo) => todo.title.toLocaleLowerCase().trim()
        .includes(filter.query.toLocaleLowerCase().trim()),
    );
  }

  return preparedTodos;
}
