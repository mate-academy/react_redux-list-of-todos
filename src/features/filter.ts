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
    setStatus(filter, { payload }: PayloadAction<Status>) {
      return { ...filter, status: payload };
    },
    setQuery(filter, { payload }: PayloadAction<string>) {
      return { ...filter, query: payload };
    },
  },
});
