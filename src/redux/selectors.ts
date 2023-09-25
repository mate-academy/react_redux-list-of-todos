import { RootState } from './store';

export const getTodos = (store: RootState) => store.todos;
export const getTodo = (store: RootState) => store.currentTodo;
export const getFilter = (store: RootState) => store.filter;
export const getFilteredTodos = (store: RootState) => {
  const { filter, todos } = store;

  return todos.filter((todo) => {
    const titleMatchesQuery = todo.title
      .toLowerCase()
      .includes(filter.query.toLowerCase());

    if (filter.status === 'all') {
      return titleMatchesQuery;
    }

    if (filter.status === 'active') {
      return !todo.completed && titleMatchesQuery;
    }

    if (filter.status === 'completed') {
      return todo.completed && titleMatchesQuery;
    }

    return false;
  });
};
