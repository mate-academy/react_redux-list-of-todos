import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Status } from '../types/Status';

export interface FilterState {
  query: string;
  status: Status;
}

const initialState: FilterState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    resetFilter() {
      return initialState;
    },
  },
});

export const { setQuery, setStatus, resetFilter } = filterSlice.actions;
export default filterSlice.reducer;
