import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from './../types/Status';

export interface FilterState {
  query: string;
  status: Status;
}

const initialState: FilterState = { query: '', status: 'all' };

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>): FilterState => {
      return {
        ...initialState,
        query: action.payload,
        status: (state as FilterState).status,
      };
    },
    setStatus: (state, action: PayloadAction<Status>): FilterState => {
      return { ...(state as FilterState), status: action.payload };
    },
  },
});
export const { setQuery, setStatus } = filterSlice.actions;
