import { Todo } from '../types/Todo';
import { Status, TodoStatus } from '../types/Status';

export const filteredTodos = (
  todos: Todo[],
  query: string,
  status: Status,
) => (
  todos.filter(({ completed, title }) => {
    const hasQuery = !query
      || title.toLowerCase().includes(query.toLowerCase());

    switch (status) {
      case TodoStatus.ACTIVE:
        return !completed && hasQuery;

      case TodoStatus.COMPLETED:
        return completed && hasQuery;

      default:
        return true && hasQuery;
    }
  })
);
