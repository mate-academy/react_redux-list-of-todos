import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

const filterTodos = (
  todos: Todo[],
  filter: { query: string, status: Status },
): Todo[] => {
  let filteredTodos = [...todos];

  const { query, status } = filter;

  switch (status) {
    case 'active':
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
      break;
    case 'completed':
      filteredTodos = filteredTodos.filter(todo => todo.completed);
      break;
    default:
      break;
  }

  if (query) {
    const lowerCasedQuery = query.toLowerCase();

    filteredTodos = filteredTodos
      .filter(todo => todo.title
        .toLowerCase()
        .includes(lowerCasedQuery));
  }

  return filteredTodos;
};

export default filterTodos;
