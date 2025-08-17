import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

const initialState = {
  query: '',
  status: 'all' as 'all' | 'active' | 'completed',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      // eslint-disable-next-line no-param-reassign
      state.query = action.payload;
    },
    setStatusFilter: (
      state,
      action: PayloadAction<'all' | 'active' | 'completed'>,
    ) => {
      // eslint-disable-next-line no-param-reassign
      state.status = action.payload;
    },
    clearQuery: state => {
      // eslint-disable-next-line no-param-reassign
      state.query = '';
    },
  },
});

export const { setQuery, setStatusFilter, clearQuery } = filterSlice.actions;

export const selectFilter = (state: RootState) => state.filter;

export const selectFilteredTodos = createSelector(
  [(state: RootState) => state.todos, selectFilter],
  (todos, filter) => {
    const normalizedQuery = filter.query.toLowerCase().trim();

    return todos.filter(todo => {
      const statusMatch =
        filter.status === 'all' ||
        (filter.status === 'completed' ? todo.completed : !todo.completed);

      const queryMatch =
        !normalizedQuery || todo.title.toLowerCase().includes(normalizedQuery);

      return statusMatch && queryMatch;
    });
  },
);

export default filterSlice.reducer;
