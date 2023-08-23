import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getVisibleTodos = (
  todos: Todo[],
  query: string,
  filterBy: string,
) => {
  let visibleTodos = [...todos];

  if (query) {
    const queryLowerCase = query.toLowerCase().trim();

    visibleTodos = visibleTodos.filter(({ title }) => (
      title.toLowerCase().includes(queryLowerCase)));
  }

  if (filterBy !== Status.ALL) {
    visibleTodos = visibleTodos.filter(({ completed }) => {
      switch (filterBy) {
        case Status.ACTIVE:
          return !completed;
        case Status.COMPLETED:
          return completed;
        default:
          return true;
      }
    });
  }

  return visibleTodos;
};
