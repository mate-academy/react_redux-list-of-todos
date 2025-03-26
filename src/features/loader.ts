import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const loaderSlice = createSlice({
  name: 'loader',
  initialState: false,
  reducers: {
    setLoading: (_state, action: PayloadAction<boolean>) => action.payload,
  },
});

export const { setLoading } = loaderSlice.actions;
export default loaderSlice.reducer;
