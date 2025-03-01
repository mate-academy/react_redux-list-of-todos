import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FILTERS } from '../types/Filters';

type FilterState = {
  query: string;
  status: (typeof FILTERS)[keyof typeof FILTERS];
};

const initialState: FilterState = {
  query: '',
  status: FILTERS.ALL,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        query: action.payload,
      };
    },
    setStatus: (
      state,
      action: PayloadAction<(typeof FILTERS)[keyof typeof FILTERS]>,
    ) => {
      return {
        ...state,
        status: action.payload,
      };
    },
  },
});

export const { setQuery, setStatus } = filterSlice.actions;
export default filterSlice.reducer;
