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
      // eslint-disable-next-line no-param-reassign
      state.select = action.payload;
    },
    filterQueryTodos: (
      state: FilterTodoState,
      action: PayloadAction<string>,
    ) => {
      // eslint-disable-next-line no-param-reassign
      state.query = action.payload;
    },
    filterEmprtyQuery: (state: FilterTodoState) => {
      // eslint-disable-next-line no-param-reassign
      state.query = '';
    },
  },
});

export const { filterStatusTodos, filterQueryTodos, filterEmprtyQuery } =
  filterSlice.actions;

export default filterSlice.reducer;
