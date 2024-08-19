import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice: Slice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, { payload }: PayloadAction<Status>) => {
      return { ...state, status: payload };
    },
    setQuery: (state, { payload }: PayloadAction<string>) => {
      return { ...state, query: payload };
    },
  },
});
