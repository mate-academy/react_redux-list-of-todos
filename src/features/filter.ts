/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    searchedQuery: (state, action) => {
      state.query = action.payload;
    },
    searchedStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { searchedQuery, searchedStatus } = filterSlice.actions;
export default filterSlice.reducer;
