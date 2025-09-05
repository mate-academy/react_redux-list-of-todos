import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = {
  todos: null as Todo[] | null,
  isTodosLoading: true as boolean,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      return {...state, todos: action.payload}
    },
    setIsTodosLoading: (state, action: PayloadAction<boolean>) => {
      return { ...state, isTodosLoading: action.payload}
    },
  },
});

export const { actions } = todosSlice;
