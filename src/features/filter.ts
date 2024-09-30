import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

type FilterState = {
  query: string;
  status: Status;
};

const initialState = {
  query: '',
  status: Status.All,
};

export const filterSlice: Slice<FilterState> = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<Status>) => ({
      ...state,
      status: payload,
    }),
    setQuery: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      query: payload,
    }),
  },
});

export const { setQuery, setStatus } = filterSlice.actions;
