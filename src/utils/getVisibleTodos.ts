import { Todo } from '../types/Todo';
import { Status } from '../types/Status';

export const getVisibleTodos = (
  todos: Todo[],
  query: string,
  status: Status,
) => {
  let visibleTodos = [...todos];

  if (query) {
    const queryRegex = new RegExp(query.trim(), 'i');

    visibleTodos = visibleTodos.filter(todo => queryRegex.test(todo.title));
  }

  if (status !== 'all') {
    visibleTodos = visibleTodos.filter(todo => {
      switch (status) {
        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        default:
          throw new Error('Invalid filter type');
      }
    });
  }

  return visibleTodos;
};
