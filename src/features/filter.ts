/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

type Filter = {
  query: string;
  status: Status;
};

const initialState: Filter = {
  query: '',
  status: 'all',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    clearQuery: state => {
      state.query = '';
    },
  },
});

export const { setStatus, setQuery, clearQuery } = filterSlice.actions;
export default filterSlice.reducer;
