import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

type InitialState = {
  query: string;
  status: Status;
};

const initialState: InitialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeStatus: (filter, action: PayloadAction<Status>) => ({
      ...filter,
      status: action.payload,
    }),
    changeQuery: (filter, action: PayloadAction<string>) => ({
      ...filter,
      query: action.payload,
    }),
    removeQuery: filter => ({
      ...filter,
      query: '',
    }),
  },
});
