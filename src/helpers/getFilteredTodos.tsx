import { TodoStatus, Todo } from '../types';

type Filters = {
  query: string,
  status: TodoStatus,
};

export function getFilteredTodos(
  todoItems: Todo[],
  category: Filters,
) {
  let preparedItems: Todo[] = todoItems;

  if (category.status !== TodoStatus.All) {
    preparedItems = preparedItems
      .filter(({ completed }) => {
        switch (category.status) {
          case TodoStatus.Active:
            return !completed;
          default:
            return completed;
        }
      });
  }

  if (category.query) {
    const preparedQuery = category.query.trim().toLowerCase();

    preparedItems = preparedItems
      .filter(({ title }) => title.toLowerCase()
        .includes(preparedQuery));
  }

  return preparedItems;
}
