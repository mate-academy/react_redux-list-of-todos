import { State as FilterState } from '../features/filter';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const filterTodos = (todos: Todo[], options: FilterState) => {
  let filteredTodos = todos;
  const { status, query } = options;

  switch (status) {
    case Status.all:
      break;

    case Status.active:
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
      break;

    case Status.complited:
      filteredTodos = filteredTodos.filter(todo => todo.completed);
      break;

    default:
      throw new Error('Invalid filter status was set');
  }

  if (query) {
    filteredTodos = filteredTodos
      .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
  }

  return filteredTodos;
};
