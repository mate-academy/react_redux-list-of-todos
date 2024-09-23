import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getTodos } from '../api';
import { AppDispatch } from '../app/store';
import { TodosState } from '../types/Slice';
import { Todo } from '../types/Todo';

const initialState: TodosState = {
  todos: [] as Todo[],
  loadingTodos: false,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => ({
      ...state,
      todos: action.payload,
    }),
    setLoadingTodos: (state, action: PayloadAction<boolean>) => ({
      ...state,
      loadingTodos: action.payload,
    }),
  },
});

export const { setTodos, setLoadingTodos } = todosSlice.actions;
export const todosReducer = todosSlice.reducer;

export const getTodosFromService = async (dispatch: AppDispatch) => {
  dispatch(setLoadingTodos(true));

  try {
    const goodsFromServer = await getTodos();

    dispatch(setTodos(goodsFromServer));
  } finally {
    dispatch(setLoadingTodos(false));
  }
};
