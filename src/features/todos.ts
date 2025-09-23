import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = {
  todos: [] as Todo[],
  loader: true as boolean,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      return { ...state, todos: action.payload };
    },
    setIsTodoLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      loader: action.payload,
    }),
  },
});

export const { actions } = todosSlice;
