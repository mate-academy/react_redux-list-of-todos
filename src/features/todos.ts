import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type TodoState = {
  items: Todo[];
  loading: boolean;
};

const initialState: TodoState = {
  items: [],
  loading: false,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Todo[]>) => {
      return {
        ...state,
        items: action.payload,
      };
    },

    todosLoading: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
  },
});

export const { set, todosLoading } = todosSlice.actions;
