import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {
    changeStatus(state, { payload }: PayloadAction<string>) {
      // eslint-disable-next-line no-param-reassign
      state.status = payload;
    },
    changeQuery(state, { payload }: PayloadAction<string>) {
      // eslint-disable-next-line no-param-reassign
      state.query = payload;
    },
  },
});
