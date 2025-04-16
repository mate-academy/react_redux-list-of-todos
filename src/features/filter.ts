import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterOption } from '../types/FilterBy';

const initialState = {
  query: '',
  status: FilterOption.ALL,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => ({
      ...state,
      query: action.payload,
    }),
    setStatus: (state, action: PayloadAction<FilterOption>) => ({
      ...state,
      status: action.payload,
    }),
  },
});
