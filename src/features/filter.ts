import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

type FilterState = {
  status: Status;
  query: string;
};

const initialState: FilterState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeStatus(state, action: PayloadAction<Status>) {
      return { ...state, status: action.payload };
    },
    changeQuery(state, action: PayloadAction<string>) {
      return { ...state, query: action.payload.toLowerCase() };
    },
  },
});

export const actions = filterSlice.actions;
