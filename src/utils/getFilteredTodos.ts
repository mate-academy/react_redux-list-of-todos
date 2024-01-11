import { FilterParams } from '../features/filter';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

function filterByStatus(todo: Todo, params: FilterParams) {
  switch (params.status) {
    case Status.All:
      return true;
    case Status.Active:
      return !todo.completed;
    case Status.Completed:
      return todo.completed;
    default:
      return true;
  }
}

function filterByQuery(todo: Todo, params: FilterParams) {
  if (!params.query) {
    return true;
  }

  return todo.title.toLowerCase().includes(params.query.toLowerCase());
}

export function getFilteredTodos(
  initialTodos: Todo[],
  params: FilterParams,
) {
  return initialTodos.filter(todo => (
    filterByStatus(todo, params)
    && filterByQuery(todo, params)
  ));
}
