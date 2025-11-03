import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSortStatus: (state, action: PayloadAction<Status>) => {
      return { ...state, status: action.payload };
    },
    setFilterQuery: (state, action: PayloadAction<string>) => {
      return { ...state, query: action.payload };
    },
  },
});
