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
    updateQuery: (filter, action: PayloadAction<string>) => {
      const updatedFilter = { ...filter };

      updatedFilter.query = action.payload;

      return updatedFilter;
    },
    updateStatus: (filter, action: PayloadAction<Status>) => {
      const updatedFilter = { ...filter };

      updatedFilter.status = action.payload;

      return updatedFilter;
    },
  },
});

export const { actions } = filterSlice;
