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
    getCurrentFilter: (state, action: PayloadAction<Status>) => {
      // eslint-disable-next-line no-param-reassign
      state.status = action.payload;
    },
    getCurrentQuery: (state, action: PayloadAction<string>) => {
      // eslint-disable-next-line no-param-reassign
      state.query = action.payload;
    },
    clearCurrentQuery: state => {
      // eslint-disable-next-line no-param-reassign
      state.query = '';
    },
  },
});

export const { getCurrentFilter, getCurrentQuery, clearCurrentQuery } =
  filterSlice.actions;
