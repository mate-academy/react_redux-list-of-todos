import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

export const selectVisibleTodos = createSelector(
  [
    (state: RootState) => state.todos.items,
    (state: RootState) => state.filter.query,
    (state: RootState) => state.filter.status,
  ],
  (todos, query, status) => {
    const normalizedQuery = query.toLocaleLowerCase();

    return todos.filter(todo => {
      if (status === 'active' && todo.completed) {
        return false;
      }

      if (status === 'completed' && !todo.completed) {
        return false;
      }

      return todo.title.toLocaleLowerCase().includes(normalizedQuery);
    });
  },
);
