import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const filterTodos = (
  todos: Todo[],
  filter: {
    query: string,
    status: Status,
  },
) => {
  let filteredTodos = todos;
  const { query, status } = filter;

  if (query) {
    filteredTodos = filteredTodos.filter(todo => {
      const normalizedQuery = query.toLowerCase();

      return todo.title.toLowerCase().includes(normalizedQuery);
    });
  }

  if (status === 'active') {
    filteredTodos = filteredTodos.filter(todo => (!todo.completed));
  }

  if (status === 'completed') {
    filteredTodos = filteredTodos.filter(todo => (
      todo.completed));
  }

  return filteredTodos;
};
