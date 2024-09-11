import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { Status } from '../types/Status';

const initialState: {
  query: string;
  status: Status;
} = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatus: (state, action) => {
      return { ...state, status: action.payload };
    },
    setQuery: (state, action) => {
      return { ...state, query: action.payload };
    },
  },
});

const filter = (state: RootState) => state.filter;

export const filterSelector = createSelector([filter], value => {
  return value;
});

export const { actions } = filterSlice;
