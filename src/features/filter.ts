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
    setStatus: ({ query }, { payload }: PayloadAction<Status>) => ({
      query,
      status: payload,
    }),
    setQuery: ({ status }, { payload }: PayloadAction<Status>) => ({
      status,
      query: payload,
    }),
  },
});
