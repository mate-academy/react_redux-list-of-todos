import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    queryChange(state, action: PayloadAction<string>) {
      return {
        ...state,
        query: action.payload,
      };
    },
    statusChange(state, action: PayloadAction<string>) {
      return {
        ...state,
        status: action.payload,
      };
    },
  },
});

export const { queryChange, statusChange } = filterSlice.actions;
