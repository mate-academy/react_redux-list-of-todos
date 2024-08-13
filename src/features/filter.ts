import { Slice, createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

type State = {
  query: string;
  status: Status;
};

const initialState: State = {
  query: '',
  status: 'all',
};

export const filterSlice: Slice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterBySelect: (state, action) => ({ ...state, status: action.payload }),
    filterByQuery: (state, action) => ({ ...state, query: action.payload }),
    clearStatus: () => initialState,
  },
});

export const { filterBySelect, filterByQuery, clearStatus } =
  filterSlice.actions;
