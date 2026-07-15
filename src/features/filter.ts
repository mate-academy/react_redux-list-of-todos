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
    onQueryChange: (state, action: PayloadAction<string>) => ({ ...state, query: action.payload }),
    onStatusChange: (state, action: PayloadAction<Status>) => ({ ...state, status: action.payload })
  },
});

export const { onQueryChange, onStatusChange } = filterSlice.actions;
