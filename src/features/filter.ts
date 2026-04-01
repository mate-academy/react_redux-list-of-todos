import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

type FilterState = {
  query: string;
  status: Status;
};

const initialState: FilterState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    status: (state, action: PayloadAction<Status>) => ({
      ...state,
      status: action.payload,
    }),
    query: (state, action: PayloadAction<string>) => ({
      ...state,
      query: action.payload,
    }),
    clearQuery: state => ({
      ...state,
      query: '',
    }),
  },
});
