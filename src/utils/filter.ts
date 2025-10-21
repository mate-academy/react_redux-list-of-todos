import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const filterTodo = (todos: Todo[], query: string, status: Status) => {
  let filteredTodos = todos;

  if (query) {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase().trim()),
    );
  }

  switch (status) {
    case 'active':
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
      break;
    case 'completed':
      filteredTodos = filteredTodos.filter(todo => todo.completed);
      break;
    default:
      break;
  }

  return filteredTodos;
};
