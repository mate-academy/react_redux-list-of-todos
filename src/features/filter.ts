/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

type FilterState = {
  query: string;
  status: 'all' | 'active' | 'completed';
};

const initialState: FilterState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setQuery, setStatus } = filterSlice.actions;
export default filterSlice.reducer;
