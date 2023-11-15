import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

export function filterTodos(todos: Todo[], filter: Filter) {
  return todos.filter(todo => {
    const hasRelatedTitle = filter.query
      ? todo.title.toLowerCase().includes(filter.query.toLowerCase())
      : true;
    let hasRelatedStatus = true;

    switch (filter.status) {
      case 'completed':
        hasRelatedStatus = todo.completed;
        break;

      case 'active':
        hasRelatedStatus = !todo.completed;
        break;

      case 'all':
        hasRelatedStatus = true;
        break;

      default:
        hasRelatedStatus = true;
    }

    return hasRelatedTitle && hasRelatedStatus;
  });
}
