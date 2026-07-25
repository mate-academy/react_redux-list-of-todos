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
    setQuery: (filter, action: { payload: string }) => ({
      ...filter,
      query: action.payload,
    }),
    setStatus: (filter, action: { payload: Status }) => ({
      ...filter,
      status: action.payload,
    }),
  },
});

export const { setQuery, setStatus } = filterSlice.actions;
