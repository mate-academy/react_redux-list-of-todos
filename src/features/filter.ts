/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

type FilterSlice = {
  query: string;
  status: Status;
};

const initialState: FilterSlice = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    resetFilter(state) {
      state.query = '';
      state.status = 'all';
    },
  },
});

export const { setQuery, setStatus, resetFilter } = filterSlice.actions;
