import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterType } from '../types/FilterType';

const initialState = {
  query: '',
  status: 'all' as FilterType,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      return { ...state, query: action.payload };
    },
    setStatus: (state, action: PayloadAction<FilterType>) => {
      return { ...state, status: action.payload };
    },
  },
});

export const { setQuery, setStatus } = filterSlice.actions;
