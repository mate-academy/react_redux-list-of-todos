import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Filter = {
  query: string;
  status: 'all' | 'active' | 'completed';
};

const initialState: Filter = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<'all' | 'active' | 'completed'>) {
      return { ...state, status: action.payload };
    },
    setQuery(state, action: PayloadAction<string>) {
      return { ...state, query: action.payload };
    },
    setQueryClear(state) {
      return { ...state, query: '' };
    },
  },
});

export const { setStatus, setQuery, setQueryClear } = filterSlice.actions;
