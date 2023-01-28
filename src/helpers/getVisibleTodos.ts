import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getVisibleTodos = (
  todos: Todo[],
  query: string,
  status: Status,
) => {
  const normalizedQuery = query
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .join(' ');

  const visibleTodos = todos.filter(todo => {
    const normalizedTodoTitle = todo.title.toLowerCase();
    const isSearchQueryMatch = normalizedTodoTitle.includes(normalizedQuery);

    let isStatusMatch = true;

    switch (status) {
      case Status.ACTIVE:
        isStatusMatch = !todo.completed;
        break;

      case Status.COMPLETED:
        isStatusMatch = todo.completed;
        break;

      default:
        isStatusMatch = true;
    }

    return isSearchQueryMatch && isStatusMatch;
  });

  return visibleTodos;
};
