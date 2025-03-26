import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Filter } from '../types/Filter';
import { Status } from '../types/Status';

const initialState: Filter = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeQuery: (filters, { payload }: PayloadAction<string>) => ({
      ...filters,
      query: payload,
    }),
    changeStatus: (filters, { payload }: PayloadAction<Status>) => ({
      ...filters,
      status: payload,
    }),
  },
});
