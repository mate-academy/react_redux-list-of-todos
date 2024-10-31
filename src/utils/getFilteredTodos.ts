import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

type Params = {
  status: Status;
  query: string;
};

export const getFilteredTodos = (todos: Todo[], { status, query }: Params) => {
  let filteredTodos = [...todos];

  filteredTodos = filteredTodos.filter(todo => {
    switch (status) {
      case 'completed':
        return todo.completed;
      case 'active':
        return !todo.completed;
      default:
        return true;
    }
  });

  const normalizedQuery = query.toLowerCase().trim();

  if (normalizedQuery) {
    filteredTodos = filteredTodos.filter(todo => {
      const normalizedTitle = todo.title.toLowerCase();

      return normalizedTitle.includes(normalizedQuery);
    });
  }

  return filteredTodos;
};
