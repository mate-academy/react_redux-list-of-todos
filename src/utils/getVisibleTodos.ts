import { Filter } from '../types/Filter';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getVisibleTodos = (allTodos: Todo[], visibleFilter: Filter) => {
  let shownTodos: Todo[] = [];

  switch (visibleFilter.global) {
    case Status.All:
      shownTodos = [...allTodos];
      break;

    case Status.Active:
      shownTodos = allTodos.filter(todo => !todo.completed);
      break;

    case Status.Completed:
      shownTodos = allTodos.filter(todo => todo.completed);
      break;

    default:
      throw new Error('Unknown filter!');
  }

  if (visibleFilter.query) {
    const lowerQuery = visibleFilter.query.toLowerCase();

    shownTodos = shownTodos.filter(todo => {
      const lowerTitle = todo.title.toLowerCase();

      return lowerTitle.includes(lowerQuery);
    });
  }

  return shownTodos;
};
