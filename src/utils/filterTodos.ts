import { FilterOptions } from '../types/FilterOptions';
import { Todo } from '../types/Todo';

export function filterTodos(todos: Todo[], { query, status }: FilterOptions) {
  const normalizedQuery = query.trim().toLowerCase();

  const filteredByTitleTodos = query
    ? todos.filter(({ title }) => title.toLowerCase().includes(normalizedQuery))
    : [...todos];

  switch (status) {
    case 'active':
      return filteredByTitleTodos.filter(({ completed }) => !completed);
    case 'completed':
      return filteredByTitleTodos.filter(({ completed }) => completed);
    default:
      return filteredByTitleTodos;
  }
}
