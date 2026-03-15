import { Todo } from '../types/Todo';

enum Status {
  Active = 'active',
  Completed = 'completed',
  All = 'all',
}

export function filterTodos(todos: Todo[], status: string, query: string) {
  let newTodos = [...todos];

  switch (status) {
    case Status.Active:
      newTodos = newTodos.filter(todo => !todo.completed);
      break;

    case Status.Completed:
      newTodos = newTodos.filter(todo => todo.completed);
      break;

    case Status.All:
      newTodos = [...todos];
      break;

    default:
      break;
  }

  return newTodos.filter(todo =>
    todo.title.toLowerCase().includes(query.toLowerCase()),
  );
}
