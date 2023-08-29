import { Filter } from '../features/filter';
import { Todo } from '../types/Todo';

function getVisibleTodos(todos: Todo[], filter: Filter) {
  let result = [...todos];

  if (filter.status !== 'all') {
    result = result.filter(todo => {
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

  if (!filter.query) {
    return result;
  }

  return result.filter(todo => {
    return todo.title.toLowerCase()
      .includes(filter.query.toLowerCase());
  });
}

export { getVisibleTodos };
