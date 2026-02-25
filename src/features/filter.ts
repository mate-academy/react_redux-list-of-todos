/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearch: (filters, action: PayloadAction<string>) => {
      filters.query = action.payload;
    },
    setStatus: (filters, action: PayloadAction<string>) => {
      filters.status = action.payload;
    },
    clearSearch: filters => {
      filters.query = '';
    },
  },
});

export const { actions } = filterSlice;
export default filterSlice.reducer;
