import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

export type FilterState = {
  query: string;
  status: Status;
};

const initialState: FilterState = {
  query: '',
  status: 'all',
};

export const filterTodoSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilterQuery: (state, action: PayloadAction<string>) => {
      // eslint-disable-next-line no-param-reassign
      state.query = action.payload;
    },
    setStatusFilter: (
      state,
      action: PayloadAction<Status>,
    ) => {
      // eslint-disable-next-line no-param-reassign
      state.status = action.payload;
    },
  },
});

export const { setFilterQuery, setStatusFilter } = filterTodoSlice.actions;

export default filterTodoSlice.reducer;

