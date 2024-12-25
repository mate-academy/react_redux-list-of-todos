import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';
import { FilterParams } from '../types/filterParams';

const initialState: FilterParams = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatus: (filter, action: PayloadAction<Status>) => {
      return { ...filter, status: action.payload };
    },
    setQuery: (filter, action: PayloadAction<string>) => {
      return { ...filter, query: action.payload };
    },
  },
});
