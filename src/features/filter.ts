/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Status } from '../types/Status';
import { FilterState } from '../types/FilterState';

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
    setStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
    clearQuery: state => {
      state.query = '';
    },
  },
});

export const { setQuery, setStatus, clearQuery } = filterSlice.actions;
