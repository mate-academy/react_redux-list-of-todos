import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

export type FilterState = { query: string; status: Status };

const initialState: FilterState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (
      state: FilterState,
      action: PayloadAction<string>,
    ): FilterState => {
      return { ...state, query: action.payload };
    },
    setStatus: (
      state: FilterState,
      action: PayloadAction<Status>,
    ): FilterState => {
      return { ...state, status: action.payload };
    },
  },
});
