import { RootState } from '../app/store';

export const selectFilteredTodos = (state: RootState) => {
  const todos = state.todos;
  const { query, status } = state.filter;

  const filteredTodos = [...todos].filter(todo =>
    todo.title.toLowerCase().includes(query.toLowerCase()),
  );

  return filteredTodos.filter(todo => {
    switch (status) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });
};
