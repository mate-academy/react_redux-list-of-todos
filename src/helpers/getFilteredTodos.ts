import { SortType } from '../types/SortType';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (
  todos: Todo[],
  sortType: SortType,
  query: string,
) => {
  let visibleTodos = [...todos];

  switch (sortType) {
    case SortType.active: {
      visibleTodos = visibleTodos.filter(todo => todo.completed === false);
      break;
    }

    case SortType.completed: {
      visibleTodos = visibleTodos.filter(todo => todo.completed);
      break;
    }

    case SortType.all:
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
