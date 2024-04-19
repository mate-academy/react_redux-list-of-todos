import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export function getFilteredTodos(
  todos: Todo[],
  query: string,
  status: Status,
): Todo[] {
  let preparedTodos = [...todos];

  if (query) {
    preparedTodos = preparedTodos.filter(({ title }) =>
      title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  switch (status) {
    case 'active':
      return preparedTodos.filter(todo => !todo.completed);

    case 'completed':
      return preparedTodos.filter(todo => todo.completed);

    default:
      return preparedTodos;
  }
}
