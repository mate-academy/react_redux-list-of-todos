import { FilterParams } from '../types/FilterParams';
import { Todo } from '../types/Todo';

export function filterTodos(todos: Todo[], { query, status }: FilterParams) {
  let filteredTodos = [...todos];
  const normalizedQuery = query.toLowerCase();

  if (status === 'active' || status === 'completed') {
    switch (status) {
      case 'active':
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;

      case 'completed':
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;
    }
  }

  if (query) {
    filteredTodos = filteredTodos.filter(todo => {
      const normalizedTitle = todo.title.toLowerCase();

      return normalizedTitle.includes(normalizedQuery);
    });
  }

  return filteredTodos;
}
