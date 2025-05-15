import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

const initialState = {
  query: '',
  status: 'all' as Status,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatus: (state, action) => {
      return { ...state, status: action.payload };
    },

    setQuery: (state, action) => {
      return { ...state, query: action.payload };
    },
  },
});

export const { setStatus, setQuery } = filterSlice.actions;
