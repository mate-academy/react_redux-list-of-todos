/* eslint-disable no-param-reassign */
import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

type FilterState = {
  status: Status;
  query: string;
};

const initialState = {
  status: Status.All,
  query: '',
};

export const filterSlice: Slice<FilterState> = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<Status>) => {
      state.status = payload;
    },

    setQuery: (state, { payload }: PayloadAction<string>) => {
      state.query = payload;
    },
  },
});
