/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

export interface FilterTodoState {
  select: Status;
  query: string;
}

const initialState: FilterTodoState = {
  select: 'all',
  query: '',
};

export const filterSlice = createSlice({
  name: 'filteredTodos',
  initialState,
  reducers: {
    filterStatusTodos: (
      state: FilterTodoState,
      action: PayloadAction<Status>,
    ) => {
      state.select = action.payload;
    },
    filterQueryTodos: (
      state: FilterTodoState,
      action: PayloadAction<string>,
    ) => {
      state.query = action.payload;
    },
    filterEmprtyQuery: (state: FilterTodoState) => {
      state.query = '';
    },
  },
});

export const { filterStatusTodos, filterQueryTodos, filterEmprtyQuery } =
  filterSlice.actions;

export default filterSlice.reducer;
