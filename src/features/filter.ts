import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FilterState = {
  query: string;
  status: 'all' | 'active' | 'completed';
};

const initialState: FilterState = {
  query: '',
  status: 'all',
};

export const filter = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      return { ...state, query: action.payload };
    },
    setStatus(state, action: PayloadAction<'all' | 'active' | 'completed'>) {
      return { ...state, status: action.payload };
    },
  },
});

export const { setQuery, setStatus } = filter.actions;
export const filterReducer = filter.reducer;
