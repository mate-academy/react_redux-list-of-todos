import { State as FilterTodosType } from '../../features/filter';
import { TodoStatusTypes } from '../../types/enums/TodoStatusTypes';
import { Todo } from '../../types/Todo';

export const getFilteredTodos = (todos: Todo[], filter: FilterTodosType) => {
  const { status, query } = filter;

  let filteredTodos = todos;

  switch (status) {
    case TodoStatusTypes.ACTIVE:
      filteredTodos = todos.filter(({ completed }) => !completed);
      break;

    case TodoStatusTypes.COMPLETED:
      filteredTodos = todos.filter(({ completed }) => completed);
      break;

    default:
      break;
  }

  if (query) {
    const normalizedQuery = query.toLowerCase();

    filteredTodos = filteredTodos.filter(({ title }) => {
      const normalizedTitle = title.toLowerCase();

      return normalizedTitle.includes(normalizedQuery);
    });
  }

  return filteredTodos;
};
