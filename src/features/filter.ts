/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

const initialState = {
  query: '',
  status: 'all' as Status,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery(filter, action: PayloadAction<string>) {
      filter.query = action.payload;
    },
    setStatus(filter, action: PayloadAction<Status>) {
      filter.status = action.payload;
    },
  },
});
