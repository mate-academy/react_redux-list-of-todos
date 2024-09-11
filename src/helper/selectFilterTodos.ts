import { FilterTypes } from '../types/FilterTypes';
import { Todo } from '../types/Todo';

export const selectFilteredTodos = (
  data: Todo[],
  filterType: FilterTypes,
  query: string,
) => {
  let filteredTodos: Todo[] = [];

  if (filterType === FilterTypes.Active) {
    filteredTodos = data.filter((t: Todo) => !t.completed);
  }

  if (filterType === FilterTypes.Completed) {
    filteredTodos = data.filter((t: Todo) => t.completed);
  }

  if (filterType === FilterTypes.All) {
    filteredTodos = data;
  }

  if (query) {
    filteredTodos = filteredTodos.filter(el =>
      el.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
    );
  }

  return filteredTodos;
};
