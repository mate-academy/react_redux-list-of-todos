import { FilterStatus } from '../types/FilterStatus';
import { Todo } from '../types/Todo';

export function getFilteredTodos(
  todos: Todo[],
  query: string,
  sortBy: string,
) {
  let filteredTodos = todos;

  if (query.length > 0) {
    filteredTodos = filteredTodos.filter(todo => (
      todo.title.toLowerCase().includes(query.toLowerCase())
    ));
  }

  switch (sortBy) {
    case FilterStatus.ALL:
      return filteredTodos;

    case FilterStatus.ACTIVE:
      return filteredTodos.filter(todo => todo.completed === false);

    case FilterStatus.COMPLETED:
      return filteredTodos.filter(todo => todo.completed === true);

    default:
      return filteredTodos;
  }
}
