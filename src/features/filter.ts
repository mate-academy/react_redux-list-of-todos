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
    addStatus: (state, action: PayloadAction<Status>) => ({
      ...state,
      status: action.payload,
    }),
    addQuery: (state, action: PayloadAction<string>) => ({
      ...state,
      query: action.payload,
    }),
  },
});
