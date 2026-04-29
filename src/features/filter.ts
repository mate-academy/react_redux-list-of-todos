import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Filter, Status } from '../types/Status';

const initialState: Filter = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeStatus(filter, actions: PayloadAction<Status>) {
      return { ...filter, status: actions.payload };
    },
    changeQuery(filter, actions: PayloadAction<string>) {
      return { ...filter, query: actions.payload };
    },
    clearQuery(filter) {
      return { ...filter, query: '' };
    },
  },
});
