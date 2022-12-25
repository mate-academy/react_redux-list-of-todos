/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

type Query = {
  query: string,
  status: Status,
};

const initialState: Query = {
  query: '',
  status: 'all',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    clearQuery: (state) => {
      state.query = '';
    },
  },
});

export default filterSlice.reducer;
export const {
  changeStatus, setQuery, clearQuery,
} = filterSlice.actions;
