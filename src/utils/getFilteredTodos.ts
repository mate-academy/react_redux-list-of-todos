import { Filter } from '../types/Status';
import { Todo } from '../types/Todo';

export function getFilteredTodos(todos: Todo[], { query, status }: Filter) {
  let result = todos;

  switch (status) {
    case 'active':
      result = result.filter(todo => !todo.completed);
      break;

    case 'completed':
      result = result.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  if (query.length > 0) {
    result = result.filter(todo =>
      todo.title.trim().toLowerCase().includes(query.trim().toLowerCase()),
    );
  }

  return result;
}
