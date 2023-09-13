import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export function filterTodos(todos: Todo[], query: string, status: Status) {
  let preparedTodos = [...todos];

  if (query) {
    const normalizedQuery = query.trim().toLowerCase();

    preparedTodos = preparedTodos.filter((todo) => {
      return todo.title.toLowerCase().includes(normalizedQuery);
    });
  }

  if (status) {
    preparedTodos = preparedTodos.filter((todo) => {
      switch (status) {
        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        default:
          return true;
      }
    });
  }

  return preparedTodos;
}
