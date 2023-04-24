import { Status } from '../types/Status';
import { Todo } from '../types/Todo';
import { FilterTodos } from '../types/filterTodos';

export const filteredTodos = (
  todos: Todo[],
  query: string,
  status: Status,
) => {
  return todos.filter(({ completed, title }) => {
    const isFilteredQuery = !query
      || title.toLowerCase().includes(query.toLocaleLowerCase());

    switch (status) {
      case FilterTodos.ACTIVE:
        return !completed && isFilteredQuery;
      case FilterTodos.COMPLETED:
        return completed && isFilteredQuery;
      default:
        return true && isFilteredQuery;
    }
  });
};
