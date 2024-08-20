import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const filterTodos = (
  todos: Todo[],
  filterParams: { status: Status; query: string },
): Todo[] => {
  const { status, query } = filterParams;
  const normalizedQuery = query.trim().toLowerCase();
  let filteredTodos = todos;

  switch (status) {
    case 'active':
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
      break;

    case 'completed':
      filteredTodos = filteredTodos.filter(todo => todo.completed);
      break;

    case 'all':
    default:
      break;
  }

  if (normalizedQuery) {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(normalizedQuery),
    );
  }

  return filteredTodos;
};
