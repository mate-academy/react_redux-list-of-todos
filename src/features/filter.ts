import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FilterStatus = 'all' | 'active' | 'completed';

interface FilterState {
  query: string;
  status: FilterStatus;
}

const initialState: FilterState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>): FilterState => ({
      ...state,
      query: action.payload,
    }),
    setStatus: (state, action: PayloadAction<FilterStatus>): FilterState => ({
      ...state,
      status: action.payload,
    }),
  },
});

export const { setQuery, setStatus } = filterSlice.actions;
