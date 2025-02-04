import { Todo } from '../types/Todo';
import { Status } from '../types/Status';

export const filterTodos = (todos: Todo[], query: string, status: Status) => {
  return todos.filter(todo => {
    const matchesQuery =
      query.trim() === '' ||
      todo.title.toLowerCase().includes(query.trim().toLowerCase());

    const matchesStatus =
      status === 'all' ||
      (status === 'active' && !todo.completed) ||
      (status === 'completed' && todo.completed);

    return matchesQuery && matchesStatus;
  });
};
