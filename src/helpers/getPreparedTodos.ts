import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export function getPreparedTodos(
  todos: Todo[],
  status: Status,
  query: string,
): Todo[] {
  let preparedTodos;

  switch (status) {
    case 'active':
      preparedTodos = todos.filter(todo => !todo.completed);
      break;
      
    case 'completed':
      preparedTodos = todos.filter(todo => todo.completed);
      break;
      
    default:
      preparedTodos = todos;
  }

  if (query) {
    preparedTodos = preparedTodos.filter(todo => {
      return todo.title.toLowerCase().includes(query.toLowerCase());
    });
  }

  return preparedTodos;
}
