import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FilterState = {
  query: string;
  status: 'all' | 'active' | 'completed';
};

const initialState: FilterState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      return { ...state, query: action.payload };
    },
    setStatus: (
      state,
      action: PayloadAction<'all' | 'active' | 'completed'>,
    ) => {
      return { ...state, status: action.payload };
    },
  },
});
