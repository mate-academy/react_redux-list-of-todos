import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      query: payload,
    }),
    clearQuery: state => ({ ...state, query: '' }),
    setStatus: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      status: payload,
    }),
  },
});
