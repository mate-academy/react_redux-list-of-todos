import { TodoStatus, Todo } from '../types';

export function getFilteredTodos(
  category: TodoStatus,
  query: string,
  todoItems: Todo[],
) {
  let preparedItems: Todo[] = todoItems;

  if (category !== TodoStatus.All) {
    preparedItems = preparedItems
      .filter(({ completed }) => {
        switch (category) {
          case TodoStatus.Active:
            return !completed;
          default:
            return completed;
        }
      });
  }

  if (query) {
    const preparedQuery = query.trim().toLowerCase();

    preparedItems = preparedItems
      .filter(({ title }) => title.toLowerCase()
        .includes(preparedQuery));
  }

  return preparedItems;
}
