import { createSlice } from '@reduxjs/toolkit';
import { Filters } from '../types/Filters';

const initialState: Filters = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action) => ({
      ...state,
      query: action.payload,
    }),
    setStatus: (state, action) => ({
      ...state,
      status: action.payload,
    }),
  },
});

export const { setQuery, setStatus } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
