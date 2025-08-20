import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterTodos: (
      _state,
      action: PayloadAction<{ query: string; status: Status }>,
    ) => {
      return {
        query: action.payload.query,
        status: action.payload.status,
      };
    },
  },
});

export const { filterTodos } = filterSlice.actions;
export const { actions } = filterSlice;
