/* eslint-disable max-len */
import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';

export const getFilteredTodos = (
  query: string,
  status: Status,
  todos: Todo[],
) => {
  const trimQuery = query.trim();
  let filteredTodos = todos;

  if (trimQuery) {
    filteredTodos = filteredTodos.filter((todo) => todo.title.toLowerCase().includes(trimQuery.toLowerCase()));
  }

  switch (status) {
    case 'active':
      return filteredTodos.filter((todo) => !todo.completed);
    case 'completed':
      return filteredTodos.filter((todo) => todo.completed);
    default:
      return filteredTodos;
  }
};
