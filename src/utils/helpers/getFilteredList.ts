import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';

export const getFilteredList = (
  todos: Todo[],
  filterName: Status,
  appliedQuery: string,
) => {
  let filteredTodos = todos;

  switch (filterName) {
    case Status.Active:
      filteredTodos = filteredTodos.filter(({ completed }) => !completed);
      break;
    case Status.Completed:
      filteredTodos = filteredTodos.filter(({ completed }) => completed);
      break;
  }

  if (appliedQuery) {
    filteredTodos = filteredTodos.filter(({ title }) =>
      title.toLowerCase().includes(appliedQuery.toLowerCase()),
    );
  }

  return filteredTodos;
};
