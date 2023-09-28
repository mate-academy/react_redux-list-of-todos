import { Filter, SelectStatus, Todo } from '../types';

export const prepareTodos = (
  todos: Todo[],
  { query, status }: Filter,
) => {
  let visibleTodos = [...todos];

  if (query) {
    visibleTodos = visibleTodos.filter(
      todo => todo.title.toLocaleLowerCase()
        .includes(query.trim().toLocaleLowerCase()),
    );
  }

  switch (status) {
    case SelectStatus.COMPLETED:
      return visibleTodos.filter(todo => todo.completed);

    case SelectStatus.ACTIVE:
      return visibleTodos.filter(todo => !todo.completed);

    default:
      return visibleTodos;
  }
};
