import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
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
    setStatus: (state, action: PayloadAction<string>) => {
      return { ...state, status: action.payload };
    },
    clearQuery: state => {
      return { ...state, query: '', status: 'all' };
    },
  },
});

export const filterActions = filterSlice.actions;
