import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Status } from '../types';

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery(state, { payload }: PayloadAction<string>) {
      return { ...state, query: payload };
    },
    setStatus(state, { payload }: PayloadAction<Status>) {
      return { ...state, status: payload };
    },
  },
});
