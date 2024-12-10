import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

interface FilterOptions {
  query?: string;
  status?: Status;
}

export const filterTodos = (
  todos: Todo[],
  options: FilterOptions = {},
): Todo[] => {
  const { query, status } = options;

  let filteredTodos = todos;

  if (query) {
    filteredTodos = todos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (status) {
    filteredTodos = filteredTodos.filter(todo => {
      if (status === Status.Active) {
        return !todo.completed;
      }

      if (status === Status.Completed) {
        return todo.completed;
      }

      return true;
    });
  }

  return filteredTodos;
};
