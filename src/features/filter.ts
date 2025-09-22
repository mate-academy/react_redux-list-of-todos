/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Status = 'all' | 'active' | 'completed';

const initialState = {
  query: '',
  status: 'all' as Status,
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
    clearFilter(state) {
      state.query = '';
      state.status = 'all';
    },
  },
});

export const { setQuery, setStatus, clearFilter } = filterSlice.actions;
