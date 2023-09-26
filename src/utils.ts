import { Status } from './types/Status';
import { Todo } from './types/Todo';

export const filterTodos = (
  todos: Todo[],
  query: string,
  status: Status,
) => {
  let filteredTodos = [...todos];

  if (query) {
    filteredTodos = filteredTodos.filter(todo => (
      todo.title.toLowerCase().includes(query.toLowerCase().trim())
    ));
  }

  if (status !== Status.All) {
    filteredTodos = filteredTodos.filter(todo => {
      switch (status) {
        case Status.Completed:
          return todo.completed;

        case Status.Active:
          return !todo.completed;

        default:
          return true;
      }
    });
  }

  return filteredTodos;
};
