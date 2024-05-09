/* pretie-disable */
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

type SearchParams = {
  status: Status;
  query: string;
};

export const getSortedTodos = (
  todos: Todo[],
  { status, query }: SearchParams,
) => {
  let copy = [...todos];

  switch (status) {
    case 'active': {
      copy = copy.filter(todo => !todo.completed);
      break;
    }

    case 'completed': {
      copy = copy.filter(todo => todo.completed);
      break;
    }

    default:
      break;
  }

  if (query) {
    const normilizeQuery = query.trim().toLowerCase();

    copy = copy.filter(todo =>
      todo.title.toLowerCase().includes(normilizeQuery),
    );
  }

  return copy;
};
