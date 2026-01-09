import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    status: 'all',
    query: '',
  },
  reducers: {
    setStatus: (state, action: PayloadAction<Status>) => ({
      ...state,
      status: action.payload,
    }),
    setQuery: (state, action: PayloadAction<string>) => ({
      ...state,
      query: action.payload,
    }),
  },
});

export const { setStatus, setQuery } = filterSlice.actions;
