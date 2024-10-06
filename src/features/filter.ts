import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';
import { RootState } from '../app/store';

const initialState = {
  query: '',
  status: Status.All,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatusFilter: (state, action: PayloadAction<Status>) => {
      return {
        ...state,
        status: action.payload,
      };
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        query: action.payload,
      };
    },
    resetFilters: () => {
      return initialState;
    },
  },
});

const filter = (state: RootState) => state.filter;

export const filterSelector = createSelector([filter], value => {
  return value;
});

export const { actions } = filterSlice;
