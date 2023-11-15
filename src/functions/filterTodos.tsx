import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export function filterTodos(
  items: Todo[],
  status: Status,
  queryValue: string,
) {
  const filteredTodos = items.filter(item => {
    switch (status) {
      case Status.Active:
        return !item.completed;

      case Status.Completed:
        return item.completed;

      case Status.All:
      default:
        return item;
    }
  });

  if (queryValue.trim()) {
    return filteredTodos.filter(item => {
      return item.title.toLowerCase()
        .includes(queryValue?.trim().toLowerCase());
    });
  }

  return filteredTodos;
}
