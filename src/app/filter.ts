import { StatusFilterSelect } from '../enums/StatusFilterSelect';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const filteringTodos = (
  todos: Todo[],
  query: string,
  status: Status,
) => {
  const filteredByTodos = todos.filter((todo) => {
    const { completed } = todo;

    switch (status) {
      case StatusFilterSelect.ALL: return true;
      case StatusFilterSelect.ACTIVE: return !completed;
      case StatusFilterSelect.COMPLETED: return completed;
      default: return true;
    }
  });

  const filteredByQueryTodos = query
    ? filteredByTodos.filter((todo) => todo.title
      .toLowerCase().includes(query.toLowerCase())) : filteredByTodos;

  return filteredByQueryTodos;
};
