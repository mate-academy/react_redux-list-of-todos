import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (
  todos: Todo[],
  query: string,
  status: Status,
) => {
  return todos.filter(todo => {
    let selectedStatus = true;

    const preparedTitle = todo.title
      .replace(/ /g, '')
      .toLowerCase();
    const preparedQuery = query
      .replace(/ /g, '')
      .toLowerCase();

    const isAppropriateTodo = preparedTitle.includes(preparedQuery);

    switch (status) {
      case Status.ACTIVE:
        selectedStatus = !todo.completed;
        break;

      case Status.COMPLETED:
        selectedStatus = todo.completed;
        break;

      default:
        break;
    }

    return isAppropriateTodo && selectedStatus;
  });
};
