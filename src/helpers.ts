import { Todo } from './types/Todo';

type FilterType = string;

enum FilteredBy {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export function filteredTodoList(
  todos: Todo[],
  filterBy: FilterType,
  query: string,
) {
  let filteredTodos = [...todos];

  if (query) {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  switch (filterBy) {
    case FilteredBy.Active:
      return filteredTodos.filter(todo => !todo.completed);
    case FilteredBy.Completed:
      return filteredTodos.filter(todo => todo.completed);
    case FilteredBy.All:
    default:
      return filteredTodos;
  }
}
