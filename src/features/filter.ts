import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

const initialState: { query: string; status: Status } = {
  query: '',
  status: 'all',
};

export const { reducer, actions } = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    updateQuery: (state, action) => {
      return { ...state, query: action.payload };
    },
    updateStatus: (state, action) => {
      return { ...state, status: action.payload };
    },
  },
});
