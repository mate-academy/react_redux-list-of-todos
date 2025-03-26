import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

export interface QueryState {
  query: string;
  status: Status;
}

const initialState: QueryState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    status(state: QueryState, action: PayloadAction<Status>) {
      return { ...state, status: action.payload };
    },
    query(state: QueryState, action: PayloadAction<string>) {
      return { ...state, query: action.payload };
    },
    cleanQuery(state: QueryState) {
      return { ...state, query: '' };
    },
  },
});

export const { status, query, cleanQuery } = filterSlice.actions;
