import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CompletionQuery } from '../types/CompletionQuery';

type Filters = {
  query: string;
  status: CompletionQuery;
};

const initialFilters: Filters = {
  query: '',
  status: CompletionQuery.All,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState: initialFilters,
  reducers: {
    changeQuery: (filters, action: PayloadAction<string>) => ({
      ...filters,
      query: action.payload,
    }),
    changeStatus: (filters, action: PayloadAction<CompletionQuery>) => ({
      ...filters,
      status: action.payload,
    }),
  },
});

export default filterSlice.reducer;
export const { changeQuery, changeStatus } = filterSlice.actions;
