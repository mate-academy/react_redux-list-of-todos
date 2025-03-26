import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const filterByStatus = (todos: Todo[], status: Status) => {
  switch (status) {
    case 'active':
      return [...todos].filter(todo => !todo.completed);

    case 'completed':
      return [...todos].filter(todo => todo.completed);

    default:
      return [...todos];
  }
};

export const filterByQuery = (todos: Todo[], query: string) => {
  if (query) {
    return [...todos].filter(todo =>
      todo.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
    );
  }

  return [...todos];
};
