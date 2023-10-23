import { Todo } from '../types/Todo';
import { SortType } from '../types/SortType';

type FilterType = {
  status: SortType,
  query: string,
};

export const getPreparedTodos = (currentTodos: Todo[], filter: FilterType) => {
  const { status, query } = filter;
  let sortedTodos: Todo[] = [];

  switch (status) {
    case SortType.ALL:
      sortedTodos = [...currentTodos];
      break;

    case SortType.ACTIVE:
      sortedTodos = currentTodos.filter(todo => !todo.completed);
      break;

    case SortType.COMPLETED:
      sortedTodos = currentTodos.filter(todo => todo.completed);
      break;

    default:
      throw new Error('Wrong sort type');
  }

  const normalizedValue = query.toLowerCase().trim();

  return sortedTodos.filter(todo => todo.title
    .toLowerCase()
    .includes(normalizedValue));
};
