import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatus: ({ query }, { payload }: PayloadAction<string>) => ({
      query,
      status: payload,
    }),
    setQuery: ({ status }, { payload }: PayloadAction<string>) => ({
      status,
      query: payload,
    }),
  },
});
