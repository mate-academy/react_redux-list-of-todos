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
    ChangeQuery: (state, action) => {
      state.query = action.payload;
    },
    ChangeStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { ChangeQuery, ChangeStatus } = filterSlice.actions;
