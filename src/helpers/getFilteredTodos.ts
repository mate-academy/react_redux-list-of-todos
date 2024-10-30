import { Todo } from '../types/Todo';
import { Status } from '../types/Status';

type Params = {
  query: string;
  status: Status;
};

export const getFilteredTodos = (todos: Todo[], { query, status }: Params) => {
  let filteredTodos = [...todos];

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

  const normilizedQuery = query.toLowerCase().trim();

  if (normilizedQuery) {
    filteredTodos = filteredTodos.filter(({ title }) => {
      const normilizedTitle = title.toLowerCase();

      return normilizedTitle.includes(normilizedQuery);
    });
  }

  return filteredTodos;
};
