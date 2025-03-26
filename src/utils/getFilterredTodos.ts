import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

export function getFilteredTodos(todos: Todo[], filter: Filter) {
  const filteredTodos = [...todos];
  const { query, status } = filter;

  return filteredTodos.filter(todo => {
    const matchesQuery = query
      ? todo.title.toLowerCase().includes(query.toLowerCase())
      : true;
    const matchesStatus =
      status === 'all' ||
      (status === 'active' && !todo.completed) ||
      (status === 'completed' && todo.completed);

    return matchesQuery && matchesStatus;
  });
}
