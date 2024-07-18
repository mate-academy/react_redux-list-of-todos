import { Status } from './types/Status';
import { Todo } from './types/Todo';

export const getPreparedTodos = (todos: Todo[], status: Status) => {
  switch (status) {
    case 'active':
      return todos.filter(item => !item.completed);
    case 'completed':
      return todos.filter(item => item.completed);
    default:
      return todos;
  }
};

export const getFilteredByQuery = (todos: Todo[], query: string) => {
  return todos.filter(item => {
    return item.title.toLowerCase().includes(query.toLowerCase());
  });
};
