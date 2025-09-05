import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  query: '' as string,
  status: 'all' as 'all' | 'active' | 'completed',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      return { ...state, query: action.payload };
    },
    setStatus: (
      state,
      action: PayloadAction<'all' | 'active' | 'completed'>,
    ) => {
      return { ...state, status: action.payload };
    },
  },
});

export const { actions } = filterSlice;
