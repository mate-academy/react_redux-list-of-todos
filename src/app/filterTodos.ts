import { FilterState } from '../types/FilterState';
import { Todo } from '../types/Todo';

export const filterTodos = (
  todos: Todo[],
  filterObject: FilterState,
): Todo[] => {
  const { query, status } = filterObject;
  let visibleTodos: Todo[] = [];

  switch (status) {
    case 'active':
      visibleTodos = todos.filter((todo) => !todo.completed);
      break;

    case 'completed':
      visibleTodos = todos.filter((todo) => todo.completed);
      break;

    default:
      visibleTodos = [...todos];
  }

  if (query) {
    const lowerQuery = query.toLocaleLowerCase();

    return visibleTodos.filter((todo) => {
      const lowerTitle = todo.title.toLocaleLowerCase();

      return lowerTitle.includes(lowerQuery);
    });
  }

  return visibleTodos;
};
