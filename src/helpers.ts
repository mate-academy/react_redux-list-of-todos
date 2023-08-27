import { Status } from './types/Status';
import { Todo } from './types/Todo';

export const validateStatus = (filter: string) => {
  if (filter === Status.Active) {
    return Status.Active;
  }

  if (filter === Status.Completed) {
    return Status.Completed;
  }

  return Status.All;
};

export const filterTodos = (
  todos: Todo[],
  filter: string,
  query: string,
) => {
  const optimizedQuery = query.toLowerCase().trim();

  return todos.filter(todo => {
    const isTitleIncludeQuery = todo.title
      .toLowerCase().includes(optimizedQuery);

    switch (filter) {
      case Status.All:
        return todo && isTitleIncludeQuery;
      case Status.Completed:
        return todo.completed && isTitleIncludeQuery;
      case Status.Active:
        return !todo.completed && isTitleIncludeQuery;
      default:
        return todo;
    }
  })
    .filter(todo => (
      todo.title.toLowerCase().includes(optimizedQuery)
    ));
};
