import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  status: 'All',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<string>) => {
      return { ...state, status: action.payload };
    },
    setQuery: (state, action: PayloadAction<string>) => {
      return { ...state, query: action.payload };
    },
    clearQuery: state => {
      return { ...state, query: '' };
    },
  },
});

export const filterActions = filterSlice.actions;
