import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (
  todos: Todo[],
  filter: { query: string; status: Status },
): Todo[] => {
  const { query, status } = filter;
  let filteredTodos = [...todos];

  if (query) {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.trim().toLowerCase()),
    );
  }

  switch (status) {
    case Status.Active:
      return filteredTodos.filter(todo => !todo.completed);

    case Status.Completed:
      return filteredTodos.filter(todo => todo.completed);

    default:
      return filteredTodos;
  }
};
