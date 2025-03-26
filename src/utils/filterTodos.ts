import { Filter } from '../enums/Filter';
import { Todo } from '../types/Todo';

export function filterTodos(
  todos: Todo[],
  filter: Filter,
  query: string,
): Todo[] {
  let result = todos;

  switch (filter) {
    case Filter.Active:
      result = result.filter(({ completed }) => !completed);
      break;
    case Filter.Completed:
      result = result.filter(({ completed }) => completed);
      break;
  }

  if (query) {
    result = result.filter(({ title }) =>
      title.toLowerCase().includes(query.toLowerCase().trim()),
    );
  }

  return result;
}
