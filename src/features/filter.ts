/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';
type FilterState = {
  query: string;
  status: Status;
};

const initialState: FilterState = {
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
    clearQuery: state => {
      state.query = '';
    },
    setStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
  },
});

export const { setQuery, setStatus, clearQuery } = filterSlice.actions;
