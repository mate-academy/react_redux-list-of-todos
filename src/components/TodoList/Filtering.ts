import { Todo } from '../../types/Todo';

export const filteredByStatus = (todo: Todo, status: string) => {
  if (status === 'all') {
    return true;
  }

  if (status === 'active') {
    return !todo.completed;
  }

  if (status === 'completed') {
    return todo.completed;
  }

  return true;
};

export const filteredByQuery = (todo: Todo, query: string) => {
  if (!query) {
    return true;
  }

  return todo.title.toLowerCase().includes(query.toLowerCase());
};

export const todosFiltering = (
  todos: Todo[],
  filter: { status: string; query: string },
) => {
  return todos.filter(
    todo =>
      filteredByStatus(todo, filter.status) &&
      filteredByQuery(todo, filter.query),
  );
};
