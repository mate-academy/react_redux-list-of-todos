/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

type Initial = {
  query: string;
  status: Status;
};

const initialState: Initial = {
  query: '',
  status: 'all',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, actions: PayloadAction<string>) => {
      state.query = actions.payload;
    },
    setStatus: (state, actions: PayloadAction<Status>) => {
      state.status = actions.payload;
    },
    clearQuery: state => {
      state.query = '';
    },
  },
});

export default filterSlice.reducer;
export const { actions } = filterSlice;
