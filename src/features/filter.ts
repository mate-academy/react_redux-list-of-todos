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
    setStatus(state, { payload }: PayloadAction<Status>) {
      return {
        ...state,
        status: payload,
      };
    },
    setQuery(state, { payload }: PayloadAction<string>) {
      return {
        ...state,
        query: payload,
      };
    },
  },
});

export const { setStatus, setQuery } = filterSlice.actions;
