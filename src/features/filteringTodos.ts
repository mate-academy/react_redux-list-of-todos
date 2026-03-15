import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export function filterTodos(todos: Todo[], status: Status, query: string) {
  let newTodos = [...todos];

  switch (status) {
    case 'active':
      newTodos = newTodos.filter(todo => !todo.completed);
      break;

    case 'completed':
      newTodos = newTodos.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  return newTodos.filter(todo =>
    todo.title.toLowerCase().includes(query.toLowerCase()),
  );
}
