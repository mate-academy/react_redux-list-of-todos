import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoState } from '../types/TodoState';

const initialState = {
  query: '',
  status: TodoState.ALL,
};

export const { reducer, actions } = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      return { ...state, query: action.payload };
    },
    setStatus: (state, action: PayloadAction<TodoState>) => {
      return { ...state, status: action.payload };
    },
  },
});
