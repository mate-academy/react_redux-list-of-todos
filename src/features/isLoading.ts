import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const isLoadingSlice = createSlice({
  name: 'isLoading',
  initialState: false,
  reducers: {
    setIsLoading(_isLoading, { payload }: PayloadAction<boolean>) {
      return payload;
    },
  },
});
