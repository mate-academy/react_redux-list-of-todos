import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterTypes } from '../types/FilterTypes';

type FilterState = {
  query: string;
  filterType: FilterTypes;
};

const initialState: FilterState = {
  query: '',
  filterType: FilterTypes.All,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilterType: (
      state: FilterState,
      action: PayloadAction<FilterTypes>,
    ) => ({
      ...state,
      filterType: action.payload,
    }),
    setQuery: (state: FilterState, action: PayloadAction<string>) => ({
      ...state,
      query: action.payload,
    }),
  },
});

export const { setFilterType, setQuery } = filterSlice.actions;
