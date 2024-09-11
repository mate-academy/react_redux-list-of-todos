/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  status: 'all',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeQuery: (filter, action: PayloadAction<string>) => {
      filter.query = action.payload;
    },

    changeStatus: (filter, action: PayloadAction<string>) => {
      filter.status = action.payload;
    },

    clearQuery: filter => {
      filter.query = '';
    },
  },
});

export default filterSlice.reducer;
export const { changeQuery, changeStatus, clearQuery } = filterSlice.actions;
