/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  status: 'all',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    rename: (state, action) => {
      state.status = action.payload;
    },

    updateQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const { rename, updateQuery } = filterSlice.actions;
export default filterSlice.reducer;
