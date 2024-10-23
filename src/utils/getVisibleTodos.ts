import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getVisibleTodos = (
  todos: Todo[],
  status: Status,
  query: string,
) => {
  const preparedQuery = query.toLowerCase().trim();

  return todos.filter(todo => {
    const preparedTodoTitle = todo.title.toLowerCase().trim();
    let matchedStatus = false;

    switch (status) {
      case 'active':
        matchedStatus = !todo.completed;
        break;

      case 'completed':
        matchedStatus = todo.completed;
        break;

      default:
        matchedStatus = true;
    }

    return matchedStatus && preparedTodoTitle.includes(preparedQuery);
  });
};
