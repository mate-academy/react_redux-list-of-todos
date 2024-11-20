import { FilterState } from '../types/FilterState';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getPreparedTodos = (
  todos: Todo[],
  { status, query }: FilterState,
) => {
  let res = [...todos];
  const prepearedQuery = query.trim().toLowerCase();

  switch (status) {
    case Status.Active:
      res = res.filter(todo => !todo.completed);
      break;

    case Status.Completed:
      res = res.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  if (prepearedQuery) {
    return res.filter(todo =>
      todo.title.toLowerCase().includes(prepearedQuery),
    );
  }

  return res;
};
