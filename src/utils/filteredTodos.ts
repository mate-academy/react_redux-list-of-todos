/* eslint-disable max-len */
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export function filteredTodos(todos: Todo[], query: string, status: Status) {
  let visibleTodos = [...todos];

  if (query) {
    const normalizeQuary = query.toLowerCase().trim();

    visibleTodos = visibleTodos.filter((todo) => todo.title.trim().toLowerCase().includes(normalizeQuary));
  }

  if (status) {
    visibleTodos = visibleTodos.filter((todo) => {
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

  return visibleTodos;
}
