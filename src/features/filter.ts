import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterBy } from '../types/FilterBy';

const initialState = {
  query: '',
  status: FilterBy.ALL,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      return { ...state, query: action.payload };
    },
    setFilter: (state, action: PayloadAction<FilterBy>) => {
      return { ...state, status: action.payload };
    },
  },
});

export default filterSlice.reducer;
export const { actions } = filterSlice;
