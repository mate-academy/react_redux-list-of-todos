import { Todo } from '../types/Todo';
import { Filters } from '../types/Filters';

type Params = {
  query: string;
  selectedFilter: Filters;
};

export const getFilteredTodos = (
  todos: Todo[],
  { query, selectedFilter }: Params,
) => {
  let filteredTodos = [...todos];

  filteredTodos = filteredTodos.filter(todo => {
    switch (selectedFilter) {
      case Filters.ACTIVE:
        return !todo.completed;

      case Filters.COMPLETED:
        return todo.completed;

      default:
        return true;
    }
  });

  const normilizedQuery = query.toLowerCase().trim();

  if (normilizedQuery) {
    filteredTodos = filteredTodos.filter(({ title }) => {
      const normilizedTitle = title.toLowerCase();

      return normilizedTitle.includes(normilizedQuery);
    });
  }

  return filteredTodos;
};
