import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (
  initialTodos: Todo[],
  status: Status,
  query: string,
) => {
  let filteredTodos = [...initialTodos];

  if (query) {
    filteredTodos = filteredTodos.filter(({ title }) =>
      title.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
    );
  }

  filteredTodos = filteredTodos.filter(todo => {
    switch (status) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  return filteredTodos;
};
