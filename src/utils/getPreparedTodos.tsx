import { Todo } from '../types/Todo';

export function getPreparedTodos(
  todos: Todo[], status: string, query: string,
) {
  let preparedTodos = [...todos];

  if (status) {
    preparedTodos = preparedTodos.filter(todo => {
      switch (status) {
        case 'active': {
          return !todo.completed;
        }

        case 'completed': {
          return todo.completed;
        }

        default:
          return true;
      }
    });
  }

  if (query.trim()) {
    preparedTodos = preparedTodos.filter(todo => todo.title
      .toLocaleUpperCase().includes(query.toLocaleUpperCase()));
  }

  return preparedTodos;
}
