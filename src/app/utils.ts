import { State } from '../features/filter';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

const filterWithQuery = (todos: Todo[], query: string) => {
  const preparedQuery = query.trim().toLowerCase();

  return todos.filter(todo => todo.title.toLowerCase().includes(preparedQuery));
};

const filterByStatus = (todos: Todo[], status: Status) => {
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
  const { query, status } = filter;
  let visibleTodos = filterByStatus(todos, status);

  if (query) {
    visibleTodos = filterWithQuery(visibleTodos, query);
  }

  return visibleTodos;
};
