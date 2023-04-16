import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

export const filterTodos = (todos: Todo[], filter: Filter) => {
  let filteredTodos = todos;
  const { query, status } = filter;

  if (query) {
    filteredTodos = filteredTodos.filter((todo) => {
      const lowerQuery = query.toLowerCase();
      const lowerTitle = todo.title.toLowerCase();

      return lowerTitle.includes(lowerQuery);
    });
  }

  if (status) {
    filteredTodos = filteredTodos.filter((todo) => {
      switch (status) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
        case 'all':
          return todo;
      }
    });
  }

  return filteredTodos;
};
