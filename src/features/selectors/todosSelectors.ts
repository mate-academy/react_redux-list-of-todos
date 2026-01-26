import { RootState } from '../../app/store';

export const selectFilteredTodos = (state: RootState) => {
  const todos = state.todos;
  const { status, query } = state.filter;

  const normalizedQuery = query.trim().toLowerCase();

  return todos
    .filter(todo => {
      if (status === 'active') {
        return !todo.completed;
      }

      if (status === 'completed') {
        return todo.completed;
      }

      return true;
    })
    .filter(todo => todo.title.toLowerCase().includes(normalizedQuery));
};
