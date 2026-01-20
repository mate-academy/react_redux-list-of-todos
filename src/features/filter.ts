/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FilterStatus = 'all' | 'active' | 'completed';

type FilterState = {
  query: string;
  status: FilterStatus;
};

const initialState: FilterState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    clearQuery: state => {
      state.query = '';
    },
    setStatus: (state, action: PayloadAction<FilterStatus>) => {
      state.status = action.payload;
    },
  },
});

export const { setQuery, clearQuery, setStatus } = filterSlice.actions;

export default filterSlice.reducer;
