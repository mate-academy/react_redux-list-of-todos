import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

function checkQuery(string: string, query: string) {
  const preparedString = string.toLocaleLowerCase().trim();
  const preparedQuery = query.toLocaleLowerCase().trim();

  return preparedString.includes(preparedQuery);
}

export function getPreparedTodos(
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
      (todo) => checkQuery(todo.title, filter.query),
    );
  }

  return preparedTodos;
}
