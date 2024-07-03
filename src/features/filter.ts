import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

export type FilterState = {
  query: string;
  status: Status;
};

const initialState = {
  query: '',
  status: 'all',
} as FilterState;

export const filterSlice: Slice<FilterState> = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    changeStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    resetQuery(state) {
      state.query = '';
    },
    resetStatus(state) {
      state.status = 'all';
    },
  },
});

export const { changeQuery, changeStatus, resetQuery, resetStatus } =
  filterSlice.actions;

export default filterSlice.reducer;
