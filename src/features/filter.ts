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
    setQuery: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      query: payload,
    }),
    clearQuery: state => ({ ...state, query: '' }),
    setStatus: (state, { payload }: PayloadAction<Status>) => ({
      ...state,
      status: payload,
    }),
  },
});
