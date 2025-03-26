/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

export interface FilterState {
  query: string;
  status: Status;
}

const initialState: FilterState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      const { payload } = action;

      state.query = payload;
    },
    setStatus: (state, action: PayloadAction<Status>) => {
      const { payload } = action;

      state.status = payload;
    },
  },
});

const { setQuery, setStatus } = filterSlice.actions;

export { setQuery, setStatus };
