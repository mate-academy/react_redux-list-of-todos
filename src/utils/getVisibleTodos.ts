import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getVisibleTodos = (
  todos: Todo[],
  query: string,
  status: Status,
) => {
  let preparedTodos = [...todos];
  const normalizedQuery = query.toLowerCase().trim();

  if (query) {
    preparedTodos = preparedTodos
      .filter(todo => todo.title.toLowerCase().includes(normalizedQuery));
  }

  switch (status) {
    case 'all':
    default:
      return preparedTodos;

    case 'completed':
      return preparedTodos.filter(todo => todo.completed);

    case 'active':
      return preparedTodos.filter(todo => !todo.completed);
  }
};
