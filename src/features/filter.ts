import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

export enum Filters {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export interface FilterState {
  query: string;
  status: Status;
}

const initialState: FilterState = {
  query: '',
  status: Filters.All,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<Status>) {
      // eslint-disable-next-line no-param-reassign
      state.status = action.payload;
    },
    setQuery(state, action: PayloadAction<string>) {
      // eslint-disable-next-line no-param-reassign
      state.query = action.payload;
    },
  },
});

export const { setFilter, setQuery } = filterSlice.actions;
