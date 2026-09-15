import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

const selectTodos = (state: RootState) => state.todos.items;
const selectFilter = (state: RootState) => state.filter;

export const selectFilteredTodos = createSelector(
  [selectTodos, selectFilter],
  (todos, filter) => {
    return todos
      .filter(todo => {
        switch (filter.status) {
          case 'active':
            return !todo.completed;
          case 'completed':
            return todo.completed;
          default:
            return true;
        }
      })
      .filter(todo =>
        todo.title.toLowerCase().includes(filter.query.toLowerCase()),
      );
  },
);
