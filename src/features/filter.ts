import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    selectFilter: (state, action) => {
      return {
        ...state,
        status: action.payload,
      };
    },
    findTodo: (state, action) => {
      return {
        ...state,
        query: action.payload.toLowerCase(),
      };
    },
  },
});

export const { selectFilter } = filterSlice.actions;
export const { findTodo } = filterSlice.actions;
