import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type StatusType = 'all' | 'active' | 'completed';

const initialState = {
  query: '',
  status: 'all',
};

export const { reducer, actions } = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setStatus(state, action: PayloadAction<StatusType>) {
      state.status = action.payload;
    },
    resetFilters(state) {
      state.query = '';
      state.status = 'all';
    },
  },
});
