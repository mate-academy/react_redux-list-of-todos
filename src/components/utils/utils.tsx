import { State } from '../../features/filter';
import { Todo } from '../../types/Todo';

const filterWithQuery = (todos: Todo[], query: string) => {
  const normalizedQuery = query.trim().toLowerCase();

  return todos.filter(todo => todo.title.toLowerCase().includes(
    normalizedQuery,
  ));
};

const filterByStatus = (todos: Todo[], status: string) => {
  switch (status) {
    case 'active':
      return todos.filter(todo => !todo.completed);
    case 'completed':
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};

export const getFilteredTodos = (todos: Todo[], filter: State) => {
  const { query, select } = filter;
  let visibleTodos = filterByStatus(todos, select);

  if (query) {
    visibleTodos = filterWithQuery(visibleTodos, query);
  }

  return visibleTodos;
};
