/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, Reducer, Slice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

export type Filter = {
  query: string;
  status: Status;
};

const initialState: Filter = {
  query: '',
  status: Status.all,
};

export const filterSlice: Slice<Filter> = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, { payload }: PayloadAction<string>) => {
      state.query = payload;
    },
    setStatus: (state, { payload }: PayloadAction<Status>) => {
      state.status = payload;
    },
  },
});

export default filterSlice.reducer as Reducer<Filter>;
