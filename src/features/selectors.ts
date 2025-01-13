import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

const selectTodos = (state: RootState) => state.todos;

const selectFilters = (state: RootState) => state.filters;

export const selectFilteredTodos = createSelector(
  [selectTodos, selectFilters],
  (todos, filter) => {
    return todos.filter(todo => {
      const matchesStatus =
        filter.status === 'all' ||
        (filter.status === 'active' && !todo.completed) ||
        (filter.status === 'completed' && todo.completed);

      const matchesSearch = todo.title
        .toLowerCase()
        .includes(filter.query.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  },
);
