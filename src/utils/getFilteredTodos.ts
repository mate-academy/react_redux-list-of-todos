import { FilterState } from '../features/filter';
import { SelectedOptions } from '../types/SelectedOptions';
import { Todo } from '../types/Todo';

export function getFilteredTodos(
  allTodos: Todo[],
  { status, query }: FilterState,
): Todo[] {
  let filteredTodos = [...allTodos];

  if (query) {
    filteredTodos = filteredTodos.filter(({ title }) =>
      title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  switch (status) {
    case SelectedOptions.active:
      return filteredTodos.filter(({ completed }) => !completed);

    case SelectedOptions.completed:
      return filteredTodos.filter(({ completed }) => completed);

    default:
      return filteredTodos;
  }
}
