import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

const FILTER_ALL = 'all';
const FILTER_ACTIVE = 'active';
const FILTER_COMPLETED = 'completed';

export function selectTodos(todos: Todo[], filter: Status = FILTER_ALL) {
  switch (filter) {
    case FILTER_ACTIVE:
      return todos.filter(todo => !todo.completed);
    case FILTER_COMPLETED:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
}
