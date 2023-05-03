import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const prepareTodos = (
  query: string,
  status: Status,
  preparedTodos: Todo[],
) => {
  let filteredTodos;

  switch (status) {
    case Status.ACTIVE:
      filteredTodos = preparedTodos.filter(todo => !todo.completed);
      break;
    case Status.COMPLETED:
      filteredTodos = preparedTodos.filter(todo => todo.completed);
      break;
    case Status.ALL:
    default:
      filteredTodos = preparedTodos;
      break;
  }

  if (query) {
    const prepareQuery = query.toLowerCase();

    filteredTodos = filteredTodos.filter(todo => todo.title.toLowerCase()
      .includes(prepareQuery));
  }

  return filteredTodos;
};
