import { Todo } from '../types/Todo';

export const getVisibleTodos = (
  todos: Todo[],
  query: string,
) => todos.filter(({ title }) => (
  title.toLowerCase().trim().includes(query.trim().toLowerCase())
));
