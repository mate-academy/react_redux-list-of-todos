import { Filter } from '../types/Filter';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (todos: Todo[], filter: Filter) => {
  const { status, query } = filter;

  const trimedQuery = query.toLowerCase().trim();

  if (status === Status.Active) {
    return todos.filter(todo => todo.title.toLowerCase().includes(trimedQuery)
      && todo.completed === false);
  }

  if (status === Status.Completed) {
    return todos.filter(todo => todo.title.toLowerCase().includes(trimedQuery)
      && todo.completed === true);
  }

  return todos.filter(todo => todo.title.toLowerCase().includes(trimedQuery));
};
