import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { FilterOptions } from '../types';

const initialState = {
  query: '',
  select: 'all' as FilterOptions,
};

type FilterState = {
  query: string;
  select: FilterOptions;
};

export const filterSlice: Slice<FilterState> = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      return {
        ...state,
        query: action.payload,
      };
    },

    setSelect(state, action: PayloadAction<FilterOptions>) {
      return {
        ...state,
        select: action.payload,
      };
    },
  },
});
