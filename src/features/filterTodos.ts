import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (
  todos: Todo[],
  filter: Status,
  query: string,
): Todo[] => {
  let filteredTodos: Todo[] = [];

  switch (filter) {
    case Status.All:
      filteredTodos = todos;
      break;

    case Status.Active:
      filteredTodos = todos.filter(todo => !todo.completed);
      break;

    case Status.Complited:
      filteredTodos = todos.filter(todo => todo.completed);
      break;

    default: throw new Error('Wrong todo status');
  }

  if (query) {
    const lowerQuery = query.toLowerCase().trim();

    filteredTodos = filteredTodos.filter(({ title }) => (
      title.toLowerCase().includes(lowerQuery)
    ));
  }

  return filteredTodos;
};
