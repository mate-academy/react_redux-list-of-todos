import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  status: 'all' as 'all' | 'active' | 'completed',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setAllFilter: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        query: action.payload,
        status: 'all',
      };
    },
    setActiveFilter: state => {
      return {
        ...state,
        status: 'active',
      };
    },
    setCompletedFilter: state => {
      return {
        ...state,
        status: 'completed',
      };
    },
    setStatusFilter: (
      state,
      action: PayloadAction<'all' | 'active' | 'completed'>,
    ) => {
      return {
        ...state,
        status: action.payload,
      };
    },
    setQueryFilter: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        query: action.payload,
      };
    },
  },
});

export const {
  setAllFilter,
  setActiveFilter,
  setCompletedFilter,
  setStatusFilter,
  setQueryFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
