import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Status = 'all' | 'active' | 'completed';

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    updateQuery: (state, action: PayloadAction<string>) => ({
      ...state,
      query: action.payload,
    }),
    updateStatus: (state, action: PayloadAction<Status>) => ({
      ...state,
      status: action.payload,
    }),
    clearQuery: () => ({
      query: '',
      status: 'all',
    }),
  },
});
