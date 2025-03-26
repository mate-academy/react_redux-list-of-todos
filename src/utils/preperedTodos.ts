import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const preperedTodos = (todos: Todo[], status: Status, query: string) => {
  const newTodos: Todo[] = todos.filter(todo => {
    const { completed, title } = todo;

    switch (status) {
      case 'active': {
        if (completed) {
          return;
        }

        break;
      }

      case 'completed': {
        if (!completed) {
          return;
        }

        break;
      }

      default:
        break;
    }

    return title.toLowerCase().includes(query.toLowerCase());
  });

  return newTodos;
};
