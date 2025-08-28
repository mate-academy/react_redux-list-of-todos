import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => ({
      ...state,
      query: action.payload,
    }),
    setFilter: (
      state,
      action: PayloadAction<'all' | 'active' | 'completed'>,
    ) => ({
      ...state,
      status: action.payload,
    }),
  },
});

export const { setQuery, setFilter } = filterSlice.actions;
