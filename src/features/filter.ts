import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

export interface TypeFilter {
  query: string;
  status: string;
}

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state: TypeFilter, { payload }: PayloadAction<string>) => ({
      ...state,
      query: payload,
    }),
    setStatus: (state: TypeFilter, { payload }: PayloadAction<Status>) => ({
      ...state,
      status: payload,
    }),
  },
});
