/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

type FilterState = {
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
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
    removeQuery: state => {
      state.query = '';
    },
    removeStatus: state => {
      state.status = 'all';
    },
  },
});

export const { setQuery, setStatus, removeQuery, removeStatus } =
  filterSlice.actions;
