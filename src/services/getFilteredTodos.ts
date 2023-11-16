import { Todo } from 'types/Todo';
import { Filters } from 'types/Filters.enum';
import { FiltersType } from 'types/Filters';

const filterByQuery = (todos: Todo[], query: string) => {
  const normalizedQuery = query.toLowerCase();

  return todos
    .filter(({ title }) => title.toLowerCase().includes(normalizedQuery));
};

const filterByStatus = (todos: Todo[], status: Filters) => {
  switch (status) {
    case Filters.Active:
      return todos.filter(({ completed }) => !completed);

    case Filters.Completed:
      return todos.filter(({ completed }) => completed);

    default:
      return todos;
  }
};

export const getFilteredTodos = (todos: Todo[], filters: FiltersType) => {
  const { query, filter } = filters;
  let filteredTodos: Todo[] = [...todos];

  if (query) {
    filteredTodos = filterByQuery(filteredTodos, query);
  }

  filteredTodos = filterByStatus(filteredTodos, filter);

  return filteredTodos;
};
