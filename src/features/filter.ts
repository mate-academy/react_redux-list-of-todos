import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

    clearQuery: state => {
      return { ...state, query: '' };
    },

    setStatus: (state, action: PayloadAction<string>) => {
      return { ...state, status: action.payload };
    },
  },
});

export const { setQuery, clearQuery, setStatus } = filterSlice.actions;
