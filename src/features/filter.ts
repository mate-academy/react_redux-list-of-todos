import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

type FilterState = {
  query: string;
  status: Status;
};

const initialState: FilterState = {
  query: '',
  status: 'all',
};

export const { reducer, actions } = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    query: (searchValue: FilterState, action: PayloadAction<string>) => ({
      ...searchValue,
      query: action.payload,
    }),
    status: (searchValue: FilterState, action: PayloadAction<Status>) => ({
      ...searchValue,
      status: action.payload,
    }),
  },
});
