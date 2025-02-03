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
    setStatus: (state, action: PayloadAction<string>) => ({
      ...state,
      status: action.payload,
    }),
    clearQuery: state => ({
      ...state,
      query: '',
    }),
  },
});