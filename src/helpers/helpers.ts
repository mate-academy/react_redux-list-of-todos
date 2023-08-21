import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getVisibleTodos = (
  todos: Todo[],
  query: string,
  status: Status,
) => {
  return todos.filter((todo) => {
    const normalizedQuery = query.trim().toLowerCase();
    const normalizedTodo = todo.title.trim().toLowerCase();

    const isTodoIncluded = normalizedTodo.includes(normalizedQuery);

    let isStatusMatch: boolean;

    switch (status) {
      case Status.Active:
        isStatusMatch = !todo.completed;
        break;

      case Status.Completed:
        isStatusMatch = todo.completed;
        break;

      default:
        isStatusMatch = true;
    }

    return isTodoIncluded && isStatusMatch;
  });
};
