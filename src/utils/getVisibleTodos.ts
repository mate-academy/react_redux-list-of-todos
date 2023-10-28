import { Filter } from '../types/Filter';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getVisibleTodos = (todos: Todo[], filter: Filter) => {
  let visibleTodos: Todo[] = [];

  switch (filter.global) {
    case Status.All:
      visibleTodos = [...todos];
      break;

    case Status.Active:
      visibleTodos = todos.filter(todo => !todo.completed);
      break;

    case Status.Completed:
      visibleTodos = todos.filter(todo => todo.completed);
      break;

    default:
      throw new Error('Unknown filter!');
  }

  if (filter.query) {
    const lowerQuery = filter.query.toLowerCase().trim();

    visibleTodos = visibleTodos.filter(todo => {
      const lowerTitle = todo.title.toLowerCase();

      return lowerTitle.includes(lowerQuery);
    });
  }

  return visibleTodos;
};
