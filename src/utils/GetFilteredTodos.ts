import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export function getFilteredTodos(
  todos: Todo[],
  filter: { status: Status; query: string },
) {
  let filteredTodos = [...todos];
  const normalizedQuery = filter.query.trim().toLowerCase();

  switch (filter.status) {
    case 'active':
      filteredTodos = todos.filter(todo => !todo.completed);
      break;

    case 'completed':
      filteredTodos = todos.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  if (normalizedQuery) {
    return filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(normalizedQuery),
    );
  }

  return filteredTodos;
}
