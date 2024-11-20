import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const filterTodos = (todos: Todo[], status: Status, query: string) => {
  return todos
    .filter(todo => {
      switch (status) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return true;
      }
    })
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
};
