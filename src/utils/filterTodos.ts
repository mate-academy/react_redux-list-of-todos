import { Status, Todo } from '../types';

export const filterTodos = (todos: Todo[], status: Status, query: string) => {
  let filteredTodos = todos;

  switch (status) {
    case Status.ACTIVE:
      filteredTodos = todos.filter(todo => !todo.completed);
      break;

    case Status.COMPLETED:
      filteredTodos = todos.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  const normalizedQuery = query.toLocaleLowerCase().trim();

  /* eslint-disable max-len */
  filteredTodos = filteredTodos.filter(todo => todo.title.toLocaleLowerCase().includes(normalizedQuery));

  return filteredTodos;
};
