import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';
/* eslint-disable no-param-reassign */

const initialState = {
  query: '',
  status: 'all' as Status,
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

export default filterSlice.reducer;
export const { setQuery, setStatus } = filterSlice.actions;
