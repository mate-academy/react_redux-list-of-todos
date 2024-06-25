import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export function getFilteredTodos(
  todos: Todo[],
  filter: { status: Status; query: string },
) {
  let filteredTodos = [...todos];
  const normalisedQuery = filter.query.trim().toLowerCase();

  switch (filter.status) {
    case Status.Active:
      filteredTodos = todos.filter(todo => !todo.completed);
      break;

    case Status.Completed:
      filteredTodos = todos.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  if (normalisedQuery) {
    return filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(normalisedQuery),
    );
  }

  return filteredTodos;
}
