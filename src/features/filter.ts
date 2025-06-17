/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

const initialState = {
  query: '',
  status: 'all' as Status,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },

    resetQuery: state => {
      state.query = '';
    },

    changeStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
  },
});

export const { changeQuery, resetQuery, changeStatus } = filterSlice.actions;
