import { createSlice } from '@reduxjs/toolkit';

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: false,
  reducers: {
    start: () => true,
    finish: () => false,
  },
});

export const { start, finish } = loadingSlice.actions;
