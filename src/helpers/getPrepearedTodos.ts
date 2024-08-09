import { FilterOptions, Todo } from '../types';

export function getPrepearedTodos(
  todos: Todo[],
  query: string,
  select: FilterOptions,
) {
  const normalizedQuery = query.trim().toLowerCase();
  let preparedTodos: Todo[] = [...todos];

  if (query) {
    preparedTodos = preparedTodos.filter(todo => {
      const normalizedTitle = todo.title.toLowerCase();

      return normalizedTitle.includes(normalizedQuery);
    });
  }

  if (select !== FilterOptions.ALL) {
    switch (select) {
      case FilterOptions.ACTIVE:
        preparedTodos = preparedTodos.filter(todo => !todo.completed);
        break;

      case FilterOptions.COMPLETED:
        preparedTodos = preparedTodos.filter(todo => todo.completed);
        break;

      default:
        break;
    }
  }

  return preparedTodos;
}
