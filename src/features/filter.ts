import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

type FilterState = {
  query: string;
  status: string;
};

const initialState: FilterState = {
  query: '',
  status: 'all',
};

export const filterSlice: Slice<FilterState> = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    /* eslint-disable no-param-reassign */
    getCurrentFilter: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
    getCurrentQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    clearCurrentQuery: state => {
      state.query = '';
    },
    /* eslint-disable no-param-reassign */
  },
});

export const { getCurrentFilter, getCurrentQuery, clearCurrentQuery } =
  filterSlice.actions;
