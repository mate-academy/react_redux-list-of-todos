import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setStatusFilter: (
      state,
      action: PayloadAction<'all' | 'active' | 'completed'>,
    ) => {
      state.status = action.payload;
    },
    clearQuery: state => {
      state.query = '';
    },
  },
});

export const { setQuery, setStatusFilter, clearQuery } = filterSlice.actions;

export const selectFilteredTodos = createSelector(
  [
    (state: RootState) => state.todos,
    (state: RootState) => state.filter.query,
    (state: RootState) => state.filter.status,
  ],
  (todos, query, status) => {
    return todos.filter(todo => {
      const matchesStatus =
        status === 'all' ||
        (status === 'completed' ? todo.completed : !todo.completed);

      const matchesQuery =
        !query || todo.title.toLowerCase().includes(query.toLowerCase());

      return matchesStatus && matchesQuery;
    });
  },
);

export default filterSlice.reducer;
