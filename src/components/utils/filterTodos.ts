import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';

export function filterTodos(
  todos: Todo[],
  filter: { query: string, status: Status },
) {
  let filteredTodos = [...todos];

  if (filter.query.trim()) {
    filteredTodos = filteredTodos.filter(
      todo => todo.title.toLowerCase().includes(filter.query.toLowerCase()),
    );

    return filteredTodos;
  }

  switch (filter.status) {
    case 'active':
      return filteredTodos.filter(todo => !todo.completed);

    case 'completed':
      return filteredTodos.filter(todo => todo.completed);

    default:
      return filteredTodos;
  }
}
