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
    filterByStatus: (state, { payload }: PayloadAction<Status>) => {
      return { ...state, status: payload };
    },
    filterByQuery: (state, { payload }: PayloadAction<string>) => {
      return { ...state, query: payload };
    },
    clearQuery: state => {
      return { ...state, query: '' };
    },
  },
});
