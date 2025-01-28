/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Filters } from '../types/Filters';

const initialState = {
  query: '',
  status: Filters.ALL,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Filters>) => {
      state.status = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
});

export const { setFilter, setQuery } = filterSlice.actions;
export default filterSlice.reducer;
