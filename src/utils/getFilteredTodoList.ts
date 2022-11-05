import { Todo } from '../types/Todo';
import { State as FilterState } from '../features/filter';
import { Status } from '../types/Status';

const isTodoIncludesQuery = (todo: Todo, query: string): boolean => {
  return todo.title.includes(query);
};

export const getFilteredTodoList = (
  todos: Todo[] | null,
  filter: FilterState,
): Todo[] => {
  if (!todos) {
    return [];
  }

  switch (filter.status) {
    case Status.All:
      return todos.filter(todo => isTodoIncludesQuery(todo, filter.query));

    case Status.Active:
      return todos.filter(todo => !todo.completed
        && isTodoIncludesQuery(todo, filter.query));

    case Status.Completed:
      return todos.filter(todo => todo.completed
        && isTodoIncludesQuery(todo, filter.query));

    default:
      return todos;
  }
};
