import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

export interface FilterType {
  query: string;
  status: Status;
}

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
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
