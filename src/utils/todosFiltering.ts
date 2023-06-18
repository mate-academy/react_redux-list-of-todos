import { Todo } from '../types/Todo';
import { State } from '../features/filter';

export const getTodosFilteredByStatus = (
  todos: Todo[],
  { status, query }: State,
) => {
  const filteredByStatus = todos.filter(({ completed }) => {
    switch (status) {
      case 'active':
        return !completed;

      case 'completed':
        return completed;

      default:
        return true;
    }
  });

  if (!query.trim().length) {
    return filteredByStatus;
  }

  return filteredByStatus.filter(({ title }) => {
    return title.toLowerCase().includes(query.toLowerCase());
  });
};
