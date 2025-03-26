import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';
import { RootState } from '../app/store';
import { Filter } from '../types/Filter';

const initialState: Filter = {
  query: '',
  status: 'all' as Status,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      query: payload,
    }),

    resetQuery: state => ({
      ...state,
      query: '',
    }),

    setStatus: (state, { payload }: PayloadAction<Status>) => ({
      ...state,
      status: payload,
    }),
  },
});

export const { setStatus, setQuery, resetQuery } = filterSlice.actions;

export const selectFilter = (state: RootState) => state.filter;
