import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

type InitialType = { query: string; status: Status };

const initialState: InitialType = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action) => ({ ...state, query: action.payload }),
    setStatus: (state, action) => ({
      ...state,
      status: action.payload as Status,
    }),
  },
});

export const { actions } = filterSlice;
