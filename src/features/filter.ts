import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    query: '',
    status: 'all',
  },
  reducers: {
    setQuery: (state, { payload }: PayloadAction<string | ''>) => {
      // eslint-disable-next-line no-param-reassign
      state.query = payload;
    },
    setStatus: (state, { payload }: PayloadAction<string>) => {
      // eslint-disable-next-line no-param-reassign
      state.status = payload;
    },
  },
});
