import { Todo, Status } from '../types';

type FilterOptions = {
  query: string;
  todosStatus: Status;
};

export const getFilteredTodos = (
  todos: Todo[],
  option: FilterOptions,
) => {
  const {
    todosStatus,
    query,
  } = option;

  let filteredTodos = todos;

  if (todosStatus !== Status.All) {
    filteredTodos = filteredTodos.filter(todo => {
      switch (todosStatus) {
        case Status.Active:
          return !todo.completed;

        case Status.Completed:
          return todo.completed;

        default:
          return true;
      }
    });
  }

  if (query) {
    filteredTodos = filteredTodos.filter(todo => {
      const { title } = todo;
      const lowerQuery = query.toLocaleLowerCase();

      return title.toLowerCase().includes(lowerQuery);
    });
  }

  return filteredTodos;
};
