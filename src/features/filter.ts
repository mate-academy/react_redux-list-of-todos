import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

const initialState = {
  query: '',
  status: 'all' as Status,
};

export const { reducer, actions } = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<Status>) => {
      return { ...state, status: action.payload };
    },
    setQuerty: (state, action: PayloadAction<string>) => {
      return { ...state, query: action.payload };
    },
    clearQuerty: state => {
      return { ...state, query: '' };
    },
  },
});
