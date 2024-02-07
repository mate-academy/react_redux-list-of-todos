import { Todo } from '../types/Todo';
import { Status } from '../enum/Status';

export const getFilteredTodos = (todos: Todo[], { query, status }) => {
  let filteredTodos = [...todos];

  if (query) {
    const filteredQuery = query.trim().toLowerCase();

    filteredTodos.filter((todo) => {
      return todo.title.toLowerCase().includes(filteredQuery);
    });
  }

  if (status) {
    filteredTodos = filteredTodos.filter(todo => {
      switch (status) {
        case Status.Active:
          return !todo.completed;

        case Status.Completed:
          return todo.completed;

        default:
          return todo;
      }
    });
  }

  return filteredTodos;
};
