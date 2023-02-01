import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (
  todos: Todo[],
  query: string,
  status: Status,
) => {
  switch (status) {
    case 'completed':
      return todos.filter(todo => todo.completed && todo.title.includes(query));
    case 'active':

      return todos.filter(todo => (
        !todo.completed && todo.title.includes(query)));
    default:
      return todos.filter(todo => todo.title.includes(query));
  }
};
