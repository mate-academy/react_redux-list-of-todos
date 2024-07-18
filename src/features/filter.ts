import { PayloadAction, createSlice } from '@reduxjs/toolkit';
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
    getCurrentFilter: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
    getCurrentQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    clearCurrentQuery: state => {
      state.query = '';
    },
  },
});

export const { getCurrentFilter, getCurrentQuery, clearCurrentQuery } =
  filterSlice.actions;
