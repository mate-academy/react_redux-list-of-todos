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

  const normalizedQuery = query.toLowerCase().trim();

  if (normalizedQuery) {
    filteredTodos = filteredTodos.filter(({ title }) => {
      const normalizedTitle = title.toLowerCase();

      return normalizedTitle.includes(normalizedQuery);
    });
  }

  return filteredTodos;
};
