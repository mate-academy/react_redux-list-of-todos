import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StatusFilter } from '../types/StatusFilter';

type InitialState = {
  status: StatusFilter;
  query: string;
};

const initialState: InitialState = {
  status: 'all',
  query: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<StatusFilter>) => {
      return { ...state, status: action.payload };
    },
    setQuery: (state, action: PayloadAction<string>) => {
      return { ...state, query: action.payload };
    },
  },
});

export const setStatus = filterSlice.actions.setStatus;
export const setQuery = filterSlice.actions.setQuery;
