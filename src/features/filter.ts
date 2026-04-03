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
    setQuery: (state, aciton: PayloadAction<string>) => {
      return { ...state, query: aciton.payload };
    },
    setStatus: (state, aciton: PayloadAction<Status>) => {
      return { ...state, status: aciton.payload };
    },
  },
});

export const { setQuery, setStatus } = filterSlice.actions;
