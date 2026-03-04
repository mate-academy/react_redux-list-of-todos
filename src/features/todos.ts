import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type InitialStateType = {
  todos: Todo[];
  loading: boolean;
  error: string;
};

const initialState: InitialStateType = {
  todos: [],
  loading: true,
  error: '',
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    startFetch: state => ({
      ...state,
      error: '',
      loading: true,
    }),

    successFetch: (state, action: PayloadAction<Todo[]>) => ({
      ...state,
      todos: action.payload,
      loading: false,
    }),

    errorFetch: (state, action: PayloadAction<string>) => ({
      ...state,
      error: action.payload,
      loading: false,
    }),
  },
});

export const { actions: todosActions, reducer: todoReducer } = todosSlice;
