import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

type Filter = {
  query: string;
  status: Status;
};

const initialState: Filter = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (filter, { payload }) => ({ ...filter, query: payload }),
    setStatus: (filter, { payload }: PayloadAction<Status>) => ({
      ...filter,
      status: payload,
    }),
  },
});
