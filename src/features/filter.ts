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
    status: (state, action: PayloadAction<Status>) => {
      return { ...state, status: action.payload };
    },
    query: (state, action: PayloadAction<string>) => {
      return { ...state, query: action.payload };
    },
  },
});
