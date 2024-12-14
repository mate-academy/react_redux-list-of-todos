import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface Filters {
  query: string;
  status: 'all' | 'completed' | 'active';
}

const initialState: Filters = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQueryFilter(state, action) {
      return {
        ...state,
        query: action.payload,
      };
    },
    setStatusFilter(state, action) {
      return {
        ...state,
        status: action.payload,
      };
    },
  },
});

export const selectFilters = (state: RootState) => state.filterReducer;

export const { setQueryFilter, setStatusFilter } = filterSlice.actions;
export default filterSlice.reducer;
