import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

interface Options {
  query?: string;
  status?: Status;
}

export function prepareTodos(
  todos: Todo[],
  { query = '', status = 'all' }: Options,
) {
  let preparedTodos = [...todos];

  if (query !== '') {
    const preparedValue = query.trim().toLowerCase();

    preparedTodos = todos.filter(todo =>
      todo.title.toLowerCase().includes(preparedValue),
    );
  }

  preparedTodos = preparedTodos.filter(todo => {
    switch (status) {
      case 'active':
        return !todo.completed;

      case 'completed':
        return todo.completed;

      default:
        return true;
    }
  });

  return preparedTodos;
}
