import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const filteredTodos = (
  todos: Todo[],
  query: string,
  status: Status,
) => {
  return todos.filter(({ completed, title }) => {
    switch (status) {
      case 'active':
        return !completed && (!query
          || title.toLowerCase().includes(query.toLocaleLowerCase()));
      case 'completed':
        return completed && (!query
          || title.toLowerCase().includes(query.toLocaleLowerCase()));
      default:
        return true && (!query
          || title.toLowerCase().includes(query.toLocaleLowerCase()));
    }
  });
};
