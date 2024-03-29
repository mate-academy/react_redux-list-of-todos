import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getPreparedTodos = (
  todos: Todo[],
  filterBy: string,
  query: string,
) => {
  let visibleTodos: Todo[] = [...todos].filter(({ completed }) => {
    switch (filterBy) {
      case Status.Active:
        return !completed;

      case Status.Completed:
        return completed;

      default:
        return true;
    }
  });

  if (query) {
    visibleTodos = visibleTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase().trim()),
    );
  }

  return visibleTodos;
};
