import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const filterTodos = (todos: Todo[], status: Status, query: string) => {
  const filteredByStatus = todos.filter(todo => {
    if (status === 'all') {
      return true;
    }

    if (status === 'active' && !todo.completed) {
      return true;
    }

    if (status === 'completed' && todo.completed) {
      return true;
    }

    return false;
  });

  return filteredByStatus.filter(todo => {
    if (!query || query === '') {
      return true;
    }

    return todo.title.toLowerCase().includes(query.toLowerCase());
  });
};
