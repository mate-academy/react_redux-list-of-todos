import { Todo } from './types/Todo';

export const getVisibleTodos = (
  todos: Todo[],
  query: string,
  filter: string,
) => {
  if (filter !== 'all' || query) {
    return todos.filter(todo => {
      const isIncludeQuery = todo.title.toLowerCase().includes(query);
      let isFiltered;

      switch (filter) {
        case 'active':
          isFiltered = todo.completed === false;
          break;

        case 'completed':
          isFiltered = todo.completed === true;
          break;

        default:
          isFiltered = true;
          break;
      }

      return isIncludeQuery && isFiltered;
    });
  }

  return todos;
};
