import { createSlice, Slice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice: Slice<typeof initialState> = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.query = payload;
    },

    setStatus: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.status = payload;
    },
  },
});
