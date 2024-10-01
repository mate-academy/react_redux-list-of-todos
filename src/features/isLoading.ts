import { createSlice } from '@reduxjs/toolkit';

export const loadingSlice = createSlice({
  name: 'isLoading',
  initialState: false,
  reducers: {
    start: () => true,
    stop: () => false,
  },
});
