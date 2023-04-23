import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const filteredTodos = (
  todos: Todo[],
  query: string,
  status: Status,
) => {
  return todos.filter(({ completed, title }) => {
    const isFilteredQuery = !query
      || title.toLowerCase().includes(query.toLocaleLowerCase());

    switch (status) {
      case 'active':
        return !completed && isFilteredQuery;
      case 'completed':
        return completed && isFilteredQuery;
      default:
        return true && isFilteredQuery;
    }
  });
};
