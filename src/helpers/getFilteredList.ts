import { Todo } from '../types/Todo';
import { Status } from '../enums/Status';

const getFilteredListBySelectValue = (todo: Todo, condition: string) => {
  switch (condition) {
    case Status.Completed:
      return todo.completed;
    case Status.Active:
      return !todo.completed;
    default:
      return true;
  }
};

const getFilteredListByInputValue = (title: string, query: string) => {
  return title.toLowerCase().includes(query.toLowerCase().trim());
};

export const getFilteredList = (
  todosList: Todo[],
  query: string,
  status: string,
): Todo[] => {
  if (status || query) {
    return todosList.filter((todo: Todo) => {
      const matchesCondition =
        !status || getFilteredListBySelectValue(todo, status);
      const matchesQuery =
        !query || getFilteredListByInputValue(todo.title, query);

      return matchesCondition && matchesQuery;
    });
  }

  return todosList;
};

