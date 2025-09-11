import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export function prepareTodos(data: Todo[], filter: Status, text: string) {
  const preparedQuery = text.trim().toLowerCase();

  switch (filter) {
    case 'active': {
      return data.filter(
        todo =>
          !todo.completed && todo.title.toLowerCase().includes(preparedQuery),
      );
    }

    case 'completed': {
      return data.filter(
        todo =>
          todo.completed && todo.title.toLowerCase().includes(preparedQuery),
      );
    }

    case 'all':
    default:
      return data.filter(todo =>
        todo.title.toLowerCase().includes(preparedQuery),
      );
  }
}
