import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  status: 'all' as 'all' | 'active' | 'completed',
};

/* eslint-disable no-param-reassign */
export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setStatus(state, action: PayloadAction<'all' | 'active' | 'completed'>) {
      state.status = action.payload;
    },
    clearQuery(state) {
      state.query = '';
    },
  },
});

export const { setQuery, setStatus, clearQuery } = filterSlice.actions;
export default filterSlice.reducer;
