import { Todo } from '../types/Todo';
import { Status } from '../types/Status';

export const getVisibleTodos = (
  todos: Todo[],
  status: Status,
  query: string,
) => {
  const normalisedQuery = query.toLowerCase().trim();

  return todos.filter(todo => {
    let currentStatus = false;

    const normalisedTitle = todo.title.toLowerCase().trim();

    switch (status) {
      case 'completed':
        currentStatus = todo.completed;
        break;

      case 'active':
        currentStatus = !todo.completed;
        break;

      default:
        currentStatus = true;
    }

    return currentStatus && normalisedTitle.includes(normalisedQuery);
  });
};
