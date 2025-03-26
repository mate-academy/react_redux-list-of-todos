import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

interface Filter {
  query: string;
  status: Status;
}

const initialState: Filter = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeStatus: (state, action: PayloadAction<Status>) => ({
      ...state,
      status: action.payload,
    }),
    addQuery: (state, action: PayloadAction<string>) => ({
      ...state,
      query: action.payload,
    }),
    clearQuery: state => ({
      ...state,
      query: '',
    }),
  },
});

export const { reducer, actions } = filterSlice;
export type { Filter };
