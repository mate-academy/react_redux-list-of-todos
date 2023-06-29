import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getVisibleTodos = (
  filterCase: string,
  todos: Todo[],
  searchQuery: string,
) => {
  let filteredTodos;

  switch (filterCase) {
    case Status.Active:
      filteredTodos = todos.filter(todo => !todo.completed);
      break;

    case Status.Completed:
      filteredTodos = todos.filter(todo => todo.completed);
      break;

    default:
      filteredTodos = todos;
      break;
  }

  if (searchQuery.trim()) {
    return filteredTodos.filter(todo => (
      todo.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
    ));
  }

  return filteredTodos;
};
