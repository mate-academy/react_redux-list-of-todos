/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

const initialState: { query: string; status: Status } = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, { payload }: PayloadAction<Status>) => {
      state.status = payload;
    },
    setQuery: (state, { payload }: PayloadAction<string>) => {
      state.query = payload;
    },
  },
});
