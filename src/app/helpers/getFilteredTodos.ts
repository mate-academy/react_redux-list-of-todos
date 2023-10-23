import { FilterState } from '../../features/filter';
import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';

export const getFilteredTodos = (
  todos: Todo[],
  filterParam: FilterState,
) => {
  let filteredTodos = todos;
  const normalizedQuery = filterParam.query.trim().toLowerCase();

  switch (filterParam.status) {
    case Status.Active:
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
      break;
    case Status.Completed:
      filteredTodos = filteredTodos.filter(todo => todo.completed);
      break;
    default:
      break;
  }

  if (normalizedQuery) {
    filteredTodos = filteredTodos
      .filter(todo => todo.title.toLowerCase().includes(normalizedQuery));
  }

  return filteredTodos;
};
