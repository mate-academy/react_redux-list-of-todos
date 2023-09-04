import { Status } from './types/Status';
import { Todo } from './types/Todo';

export const getVisibleTodos = (
  todos: Todo[],
  status: Status,
  query: string,
): Todo[] => {
  const filteredTodos = todos.filter(todo => {
    switch (status) {
      case Status.ACTIVE: return !todo.completed;

      case Status.COMPLETED: return todo.completed;

      default: return true;
    }
  });

  if (query.trim()) {
    return filteredTodos.filter(todo => todo.title.toLowerCase()
      .includes(query.toLowerCase()));
  }

  return filteredTodos;
};
