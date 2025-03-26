import { FilterTypes } from '../enums';
import { Status, Todo } from '../types';

const { Active, Completed } = FilterTypes;

export const getFilteredTodos = (
  todos: Todo[],
  status: Status,
  query: string,
): Todo[] => {
  let filtered = todos;

  if (query.trim()) {
    const lowerCaseQuery = query.toLowerCase();

    filtered = filtered.filter(todo =>
      todo.title.toLowerCase().includes(lowerCaseQuery),
    );
  }

  switch (status) {
    case Active:
      return filtered.filter(todo => !todo.completed);
    case Completed:
      return filtered.filter(todo => todo.completed);
    default:
      break;
  }

  return filtered;
};
