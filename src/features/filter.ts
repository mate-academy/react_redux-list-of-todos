import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit';
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
    setFilter: (state, { payload }: PayloadAction<Status>) => {
      return { ...state, status: payload };
    },
    setQuery: (state, { payload }: PayloadAction<string>) => {
      return { ...state, query: payload };
    },
  },
});
