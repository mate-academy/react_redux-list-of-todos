import { SortType } from '../types/SortType';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (
  todos: Todo[],
  sortType: SortType,
  query: string,
) => {
  let visibleTodos = [...todos];

  switch (sortType) {
    case SortType.ACTIVE: {
      visibleTodos = visibleTodos.filter(todo => todo.completed === false);
      break;
    }

    case SortType.COMPLETED: {
      visibleTodos = visibleTodos.filter(todo => todo.completed);
      break;
    }

    case SortType.ALL:
    default: {
      break;
    }
  }

  if (query) {
    visibleTodos = visibleTodos
      .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
  }

  return visibleTodos;
};
