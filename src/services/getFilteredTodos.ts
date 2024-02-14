import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export function getFilteredTodos(
  todos: Todo[],
  query: string,
  status: Status,
) {
  let updatedTodos = [...todos];

  if (query) {
    const normalizedQuery = query.toLowerCase().trim();

    updatedTodos = updatedTodos.filter(todo => {
      return todo.title.toLowerCase().includes(normalizedQuery);
    });
  }

  if (status) {
    updatedTodos = updatedTodos.filter(todo => {
      switch (status) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return todo;
      }
    });
  }

  return updatedTodos;
}
