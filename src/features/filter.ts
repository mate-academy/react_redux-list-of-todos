/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface FilterState {
  query: string;
  status: 'all' | 'active' | 'completed';
}

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

    setStatus: (
      state,
      action: PayloadAction<'all' | 'active' | 'completed'>,
    ) => {
      state.status = action.payload;
    },

    clearQuery: state => {
      state.query = '';
    },
  },
});

export const { setQuery, setStatus, clearQuery } = filterSlice.actions;
export const selectorFilterQuery = (state: RootState) => state.filter.query;
export const selectFilterStatus = (state: RootState) => state.filter.status;
export type { FilterState };
