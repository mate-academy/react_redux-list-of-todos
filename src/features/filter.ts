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
    setQuery: (state: Filter, { payload }: PayloadAction<string>) => ({
      ...state,
      query: payload,
    }),
    setStatus: (state: Filter, { payload }: PayloadAction<Status>) => ({
      ...state,
      status: payload,
    }),
  },
});
