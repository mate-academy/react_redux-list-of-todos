import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FilterStatusVarieties = 'all' | 'active' | 'completed';

export interface FilterState {
  query: string;
  status: FilterStatusVarieties;
}

const initialState: FilterState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    clearQueryFilter: state => {
      return { ...state, query: '' };
    },
    setFilter: (state, action: PayloadAction<Partial<FilterState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { clearQueryFilter, setFilter } = filterSlice.actions;

export default filterSlice.reducer;
