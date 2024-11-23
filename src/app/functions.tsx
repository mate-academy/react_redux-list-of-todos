import { Todo } from '../types/Todo';
import { TodoStatus } from '../types/Status';

export const filterTodos = (
  todos: Todo[],
  status: TodoStatus, // Використання enum
  query: string,
): Todo[] => {
  let filteredTodos;

  switch (status) {
    case TodoStatus.Active:
      filteredTodos = todos.filter(todo => !todo.completed);
      break;
    case TodoStatus.Completed:
      filteredTodos = todos.filter(todo => todo.completed);
      break;
    default:
      filteredTodos = todos;
      break;
  }

  if (query) {
    return filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  } else {
    return filteredTodos;
  }
};
