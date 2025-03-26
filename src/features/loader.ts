import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
};

export const loaderSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading(state, { payload }: PayloadAction<boolean>) {
      // eslint-disable-next-line no-param-reassign
      state.loading = payload;
    },
  },
});
