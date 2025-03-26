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
    queryFilter: (state, action) => {
      state.query = action.payload;
    },
    statusFilter: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { queryFilter, statusFilter } = filterSlice.actions;
export default filterSlice.reducer;
