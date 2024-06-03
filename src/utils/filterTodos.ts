import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const filteredTodos = (todos: Todo[], status: Status, query: string) => {
  switch (status) {
    case 'all':
      return todos.filter(t =>
        t.title.toUpperCase().includes(query.toUpperCase()),
      );

    case 'active':
      return todos.filter(
        t =>
          !t.completed && t.title.toUpperCase().includes(query.toUpperCase()),
      );

    case 'completed':
      return todos.filter(
        t => t.completed && t.title.toUpperCase().includes(query.toUpperCase()),
      );
  }
};
