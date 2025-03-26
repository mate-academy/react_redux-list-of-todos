import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

const initialState = {
  query: '',
  status: 'all',
};

type Filters = typeof initialState;

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<Status>): Filters => {
      return { ...state, status: action.payload };
    },
    setQuery: (state, action: PayloadAction<string>): Filters => {
      return { ...state, query: action.payload };
    },
  },
});
