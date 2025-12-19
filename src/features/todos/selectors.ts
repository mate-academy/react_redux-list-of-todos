import { RootState } from '../../app/store';
import { Todo } from '../../types/Todo';

export const selectVisibleTodos = (state: RootState): Todo[] => {
  const { items } = state.todos;
  const { query, status } = state.filter;

  const normalizedQuery = query.trim().toLowerCase();

  let result = items;

  if (normalizedQuery) {
    result = result.filter(todo =>
      todo.title.toLowerCase().includes(normalizedQuery),
    );
  }

  switch (status) {
    case 'active':
      return result.filter(todo => !todo.completed);
    case 'completed':
      return result.filter(todo => todo.completed);
    default:
      return result;
  }
};
