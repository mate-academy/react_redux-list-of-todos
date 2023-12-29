import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const filterTodos = (
  todos: Todo[],
  status: Status,
  query: string,
): Todo[] => {
  return todos
    .filter(todo => (
      todo.title.toLowerCase().includes(query.toLowerCase().trim())
    ))
    .filter(todo => {
      switch (status) {
        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        default:
          return todo;
      }
    });
};
