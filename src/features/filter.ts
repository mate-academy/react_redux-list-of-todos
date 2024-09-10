import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

const initialState: {
  query: string;
  status: Status;
} = {
  query: '',
  status: 'all',
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

export const { actions } = filterSlice;
