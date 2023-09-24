import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (
  todos: Todo[],
  query: string,
  status: Status,
) => {
  return todos.filter((todo) => {
    const titleMatchesQuery = todo.title
      .toLowerCase()
      .includes(query.toLowerCase());

    if (status === 'all') {
      return titleMatchesQuery;
    }

    if (status === 'active') {
      return !todo.completed && titleMatchesQuery;
    }

    if (status === 'completed') {
      return todo.completed && titleMatchesQuery;
    }

    return false;
  });
};
