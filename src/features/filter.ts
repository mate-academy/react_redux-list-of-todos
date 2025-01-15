/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

const initialState = {
  query: '',
  status: Status.All,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery(filter, { payload }: PayloadAction<string>) {
      filter.query = payload;
    },
    clearQuery(filter) {
      filter.query = '';
    },
    setStatus(filter, { payload }: PayloadAction<Status>) {
      filter.status = payload;
    },
  },
});
