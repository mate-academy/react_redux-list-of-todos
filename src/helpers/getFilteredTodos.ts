import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

type FilterParams = {
  query: string;
  status: Status;
};

export function getFilteredTodos(
  todos: Todo[],
  { query, status }: FilterParams,
) {
  let filteredTodos = [...todos];

  if (query) {
    filteredTodos = filteredTodos.filter(todo => {
      return todo.title.toLowerCase().includes(query.toLowerCase());
    });
  }

  if (status) {
    switch (status) {
      case 'active':
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;

      case 'completed':
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;

      default:
        return filteredTodos;
    }
  }

  return filteredTodos;
}
