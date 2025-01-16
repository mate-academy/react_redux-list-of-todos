import { Todo } from '../types/Todo';

export const filteredTodos = (todos: Todo[], filter: string, query: string) => {
  let filtered = todos;

  if (query) {
    const lowerCaseQuery = query.toLowerCase();

    filtered = filtered.filter(todo =>
      todo.title.toLowerCase().includes(lowerCaseQuery),
    );
  }

  switch (filter) {
    case 'all':
      return filtered;
    case 'active':
      return filtered.filter(todo => !todo.completed);
    case 'completed':
      return filtered.filter(todo => todo.completed);
    default:
      return filtered;
  }
};
