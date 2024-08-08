import { FilterType } from '../types/FilterType';
import { Todo } from '../types/Todo';

export const flterByTypes = (type: string, todos: Todo[], query: string) => {
  let filtered = todos;

  switch (type) {
    case FilterType.Active:
      filtered = todos.filter(todo => !todo.completed);
      break;
    case FilterType.Completed:
      filtered = todos.filter(todo => todo.completed);
      break;
    default:
      filtered = todos;
      break;
  }

  if (query) {
    filtered = filtered.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  return filtered;
};
