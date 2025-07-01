import { Filters } from '../types/Filters';
import { Todo } from '../types/Todo';

export const getVisibleTodos = (
  todos: Todo[],
  status: Filters,
  query: string,
) => {
  let visibleTodos = [...todos];

  if (status === Filters.Completed) {
    visibleTodos = visibleTodos.filter(todo => todo.completed === true);
  }

  if (status === Filters.Active) {
    visibleTodos = visibleTodos.filter(todo => todo.completed === false);
  }

  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery) {
    visibleTodos = visibleTodos.filter(({ title }) =>
      title.toLowerCase().includes(normalizedQuery),
    );
  }

  return visibleTodos;
};
