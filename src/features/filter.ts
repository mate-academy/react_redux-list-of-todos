/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

const initialState = {
  query: '',
  status: 'all' as Status,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action) => ({
      ...state,
      status: action.payload as Status,
    }),
    setQuery: (state, action) => ({
      ...state,
      query: action.payload,
    }),
  },
});

export const { setFilter, setQuery } = filterSlice.actions;
