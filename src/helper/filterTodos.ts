import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

type Filters = {
  status: Status,
  query: string,
};

export const getVisibleTodos = (todos: Todo[], filterBy: Filters): Todo[] => {
  let visibleTodos = [...todos];

  if (filterBy.query) {
    visibleTodos = visibleTodos.filter((todo) => {
      return todo.title.toLowerCase().includes(filterBy.query.toLowerCase());
    });
  }

  if (filterBy.status) {
    switch (filterBy.status) {
      case 'active':
        return visibleTodos.filter(todo => {
          return !todo.completed;
        });

      case 'completed':
        return visibleTodos.filter(todo => {
          return todo.completed;
        });

      case 'all':
      default:
        return visibleTodos;
    }
  }

  return visibleTodos;
};
