import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';
import { Filter } from '../types/Filter';

const initialState: Filter = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    query: (filter: Filter, { payload }: PayloadAction<string>) => ({
      ...filter,
      query: payload,
    }),
    status: (filter: Filter, { payload }: PayloadAction<Status>) => ({
      ...filter,
      status: payload,
    }),
    clear: (filter: Filter) => ({
      ...filter,
      query: '',
    }),
  },
});
