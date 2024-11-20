import { Filter } from '../features/filter';
import { Todo } from '../types/Todo';

export function getDispayedTodos(todos: Todo[], { status, query }: Filter) {
  return todos.filter(todo => {
    let satisfyQuery = true;

    if (query) {
      const normalizedQuery = query.toLowerCase();
      const normalizedTitle = todo.title.toLowerCase();

      satisfyQuery = normalizedTitle.includes(normalizedQuery);
    }

    switch (status) {
      case 'completed':
        return todo.completed && satisfyQuery;
      case 'active':
        return !todo.completed && satisfyQuery;
      default:
        return satisfyQuery;
    }
  });
}
