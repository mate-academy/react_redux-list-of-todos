import { Todo } from '../types/Todo';
import { Status } from '../types/Status';

export const getFilteredTodos = (
  todos: Todo[],
  filter: { query: string, status: Status },
) => {
  const { query, status } = filter;

  const searchedTodos = todos.filter(({ title }) => {
    return title.toLowerCase().includes(query.toLowerCase());
  });

  return searchedTodos.filter((todo) => {
    switch (status) {
      case 'active':
        return !todo.completed;

      case 'completed':
        return todo.completed;

      default:
        return todo;
    }
  });
};
