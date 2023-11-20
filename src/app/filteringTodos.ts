import { FilterStatusEnum } from '../types/FilterStatusEnum';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const filteringTodos = (
  todos: Todo[],
  query: string,
  status: Status,
) => {
  const filteredByTodos = todos.filter((todo) => {
    const { completed } = todo;

    switch (status) {
      case FilterStatusEnum.ALL:
        return true;
      case FilterStatusEnum.COMPLETED:
        return completed;
      case FilterStatusEnum.ACTIVE:
        return !completed;
      default:
        return true;
    }
  });

  const filteredByQueryTodos = query
    ? filteredByTodos.filter((todo) => todo.title
      .toLocaleLowerCase().includes(query.toLocaleLowerCase()))
    : filteredByTodos;

  return filteredByQueryTodos;
};
