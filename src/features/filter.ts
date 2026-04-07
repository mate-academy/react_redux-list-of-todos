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
    setStatusFilter: (state, action: PayloadAction<Status>) => {
      return { ...state, status: action.payload };
    },

    setQuery: (state, action: PayloadAction<string>) => {
      return { ...state, query: action.payload };
    },
  },
});

export const { setStatusFilter, setQuery } = filterSlice.actions;
