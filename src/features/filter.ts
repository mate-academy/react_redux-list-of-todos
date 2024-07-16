/* eslint-disable no-param-reassign */
import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

export interface FilterState {
  query: string;
  status: Status;
}

const initialState: FilterState = {
  query: '',
  status: Status.All,
};

export const filterSlice: Slice<FilterState> = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery(state: { query: string }, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setStatus(state: { status: Status }, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
  },
});

export const { setQuery, setStatus } = filterSlice.actions;
