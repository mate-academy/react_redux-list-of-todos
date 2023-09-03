import { Todo } from '../types/Todo';

export const getVisibleTodos = (
  todos: Todo[],
  status: string,
  query: string,
) => {
  const normalizeTitle = (item: string) => item
    .toLowerCase().includes(query.toLowerCase());

  switch (status) {
    case 'active':
      return todos.filter(
        todo => !todo.completed && normalizeTitle(todo.title),
      );

    case 'completed':
      return todos.filter(todo => todo.completed && normalizeTitle(todo.title));

    default:
      return todos.filter(todo => normalizeTitle(todo.title));
  }
};
