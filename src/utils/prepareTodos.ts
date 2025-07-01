import { SelectStatusTodos } from '../types/SelectStatusTodos';
import { Todo } from '../types/Todo';

interface FilterTodos {
  searchByTitle: string;
  selectStatusTodos: SelectStatusTodos;
}

export const prepareTodos = (todos: Todo[], filter: FilterTodos): Todo[] => {
  let preparedTodos = [...todos];

  if (filter.searchByTitle !== '') {
    const normalizeSearch = filter.searchByTitle.trim().toLowerCase();

    preparedTodos = todos.filter(todo =>
      todo.title.toLowerCase().includes(normalizeSearch),
    );
  }

  switch (filter.selectStatusTodos) {
    case SelectStatusTodos.Active:
      preparedTodos = preparedTodos.filter(todo => todo.completed === false);
      break;
    case SelectStatusTodos.Completed:
      preparedTodos = preparedTodos.filter(todo => todo.completed);
      break;
  }

  return preparedTodos;
};
