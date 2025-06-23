import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FilterStatus = 'all' | 'active' | 'completed';

export interface FilterState {
  status: FilterStatus;
  query: string;
}

const initialState: FilterState = {
  status: 'all',
  query: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatusFilter: (state, action: PayloadAction<FilterState['status']>) => {
      return {
        ...state,
        status: action.payload,
      }
    },
    setQueryFilter: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        query: action.payload,
      }
    },
  },
});

export const { setStatusFilter, setQueryFilter } = filterSlice.actions;
export default filterSlice.reducer;
