import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterStatus(state, { payload }: PayloadAction<string>) {
      // eslint-disable-next-line no-param-reassign
      state.status = payload;
    },

    query(state, { payload }: PayloadAction<string>) {
      // eslint-disable-next-line no-param-reassign
      state.query = payload;
    },
  },
});
