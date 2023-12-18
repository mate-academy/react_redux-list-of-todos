import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

export function getFilteredTodos(todos: Todo[], filter: Filter) {
  let filteredTodos = [...todos];

  if (filter.status !== 'all') {
    filteredTodos = filteredTodos.filter((todo) => {
      switch (filter.status) {
        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        default:
          return true;
      }
    });
  }

  if (filter.query) {
    const normalizedQuery = filter.query.toLowerCase();

    filteredTodos = filteredTodos.filter(todo => (
      todo.title.toLowerCase().includes(normalizedQuery)
    ));
  }

  return filteredTodos;
}
