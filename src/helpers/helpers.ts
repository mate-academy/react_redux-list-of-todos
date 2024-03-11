import { SearchParams } from '../types/SearchParams';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (todos: Todo[], params: SearchParams) => {
  let copyOftodos = [...todos];
  const { query, status } = params;
  const preaperedQuery = query.toLowerCase().trim();

  if (query) {
    copyOftodos = copyOftodos.filter(({ title }) => {
      const preaperedTitle = title.toLowerCase();

      return preaperedTitle.includes(preaperedQuery);
    });
  }

  if (status !== 'all') {
    switch (status) {
      case 'active':
        return copyOftodos.filter(({ completed }) => !completed);
      case 'completed':
        return copyOftodos.filter(({ completed }) => completed);
      default:
        return copyOftodos;
    }
  }

  return copyOftodos;
};
