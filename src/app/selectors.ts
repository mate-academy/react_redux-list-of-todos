import { RootState } from './store';

export const filteredTodosSelector = (state: RootState) => {
  const { todos } = state;
  const { query, status } = state.filter;

  return todos.filter(todo => {
    const includesQuery = todo.title
      .toLowerCase()
      .includes(query.toLowerCase());

    switch (status) {
      case 'all':
        return includesQuery;

      case 'active':
        return !todo.completed && includesQuery;

      case 'completed':
        return todo.completed && includesQuery;

      default:
        return true;
    }
  });
};
