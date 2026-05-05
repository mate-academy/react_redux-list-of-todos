/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { Status, StatusType } from '../types/Status';

type FilterState = {
  query: string;
  status: Status;
};

const initialState: FilterState = {
  query: '',
  status: StatusType.ALL,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action: { payload: string }) => {
      state.query = action.payload;
    },
    clearQuery: state => {
      state.query = '';
    },
    setStatus: (state, action: { payload: Status }) => {
      state.status = action.payload;
    },
  },
});

export const filterActions = filterSlice.actions;

export default filterSlice.reducer;
