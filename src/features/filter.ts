import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Filter } from '../types/Filter';

export interface FilterState {
  query: string;
  status: Filter;
}

const initialState: FilterState = {
  query: '',
  status: Filter.All,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      return { ...state, query: action.payload };
    },

    setStatus: (state, action: PayloadAction<Filter>) => {
      return { ...state, status: action.payload };
    },

    clearQuery: state => {
      return { ...state, query: '' };
    },
  },
});

export const { setQuery, setStatus, clearQuery } = filterSlice.actions;
export default filterSlice.reducer;
