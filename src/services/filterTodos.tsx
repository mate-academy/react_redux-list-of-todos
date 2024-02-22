import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const filterTodos = (
  query: string,
  status: Status,
  todos: Todo[],
) => {
  return todos.filter((todo) => {
    const prevQuery = query.toLowerCase().trim();
    const serchQuery = todo.title.toLowerCase().includes(prevQuery);

    switch (status) {
      case 'all':
        return serchQuery;

      case 'active':
        return serchQuery && !todo.completed;

      case 'completed':
        return serchQuery && todo.completed;

      default:
        return serchQuery;
    }
  });
};
