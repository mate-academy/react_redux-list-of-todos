import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';

export const filterTodos = (
  todosFromAPI: Todo[],
  query: string,
  status: Status,
): Todo[] => {
  let todosToProceed = [...todosFromAPI];

  if (query) {
    todosToProceed = todosToProceed.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase().trim()),
    );
  }

  if (status) {
    switch (status) {
      case 'active': {
        todosToProceed = todosToProceed.filter(todo => !todo.completed);
        break;
      }

      case 'completed': {
        todosToProceed = todosToProceed.filter(todo => todo.completed);
        break;
      }

      default: {
        return todosToProceed;
      }
    }
  }

  return todosToProceed;
};
