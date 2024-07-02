/* eslint-disable */
import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice: Slice<typeof initialState> = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<string>) => {
      state.status = payload;
    },
    setQuery: (state, { payload }: PayloadAction<string>) => {
      state.query = payload;
    },
    clearQuery: state => {
      state.query = '';
    },
  },
});
