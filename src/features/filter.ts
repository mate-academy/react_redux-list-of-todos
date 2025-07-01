import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Filters } from '../types/Filters';

export interface FilterState {
  query: string;
  status: Filters;
}

const initialState: FilterState = {
  query: '',
  status: Filters.All,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<Filters>) {
      state.status = action.payload;
    },
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
  },
});

export default filterSlice;
export const { setStatus, setQuery } = filterSlice.actions;
