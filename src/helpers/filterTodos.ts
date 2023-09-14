/*eslint-disable*/
import { SORT } from "../types/SortEnum";
import { Todo } from "../types/Todo";

type FilterType = {
  sort: SORT;
  query: string;
};

export const filterTodos = (
  initialTodos: Todo[],
  { sort, query }: FilterType
): Todo[] => {
  let todoCopy = [...initialTodos];

  if (query) {
    const lowerSearch = query.toLowerCase().trim();

    todoCopy = todoCopy.filter((todo) =>
      todo.title.toLowerCase().includes(lowerSearch)
    );
  }

  if (sort) {
    todoCopy = todoCopy.filter((todo) => {
      switch (sort) {
        case SORT.ACTIVE:
          return !todo.completed;
        case SORT.COMPLETED:
          return todo.completed;
        default:
          return todo;
      }
    });
  }

  return todoCopy;
};
