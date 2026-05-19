import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: false,
  reducers: {
    setLoading: (_, action: PayloadAction<boolean>) => action.payload,
  },
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
