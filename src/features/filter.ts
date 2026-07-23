import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

type FilterState = {
  query: string;
  status: Status;
};

const initialState: FilterState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (filter, action: PayloadAction<string>) => ({
      ...filter,
      query: action.payload,
    }),
    clearQuery: filter => ({
      ...filter,
      query: initialState.query,
    }),
    setStatus: (filter, action: PayloadAction<Status>) => ({
      ...filter,
      status: action.payload,
    }),
  },
});

export const { setQuery, clearQuery, setStatus } = filterSlice.actions;
