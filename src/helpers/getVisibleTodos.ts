import { FilterTypes } from '../types/FilterTypes';
import { Todo } from '../types/Todo';

export const getVisibleTodos = (
  allTodos: Todo[],
  status: FilterTypes,
  query: string,
) => {
  let filteredTodos: Todo[] = allTodos;

  if (status === FilterTypes.Active || status === FilterTypes.Completed) {
    filteredTodos = filteredTodos.filter(({ completed }) =>
      status === FilterTypes.Active ? !completed : completed,
    );
  }

  if (query) {
    filteredTodos = filteredTodos.filter(({ title }) =>
      title.toLowerCase().includes(query.trim().toLowerCase()),
    );
  }

  return filteredTodos;
};
