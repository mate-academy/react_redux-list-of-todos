import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeQuery: (state, action: PayloadAction<string>) => ({
      ...state,
      query: action.payload,
    }),
    changeStatus: (state, action: PayloadAction<string>) => ({
      ...state,
      status: action.payload,
    }),
  },
});

export const { actions } = filterSlice;
