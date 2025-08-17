import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { getTodos } from '../api';
import { AppDispatch } from '../app/store';

const logErrorSilently = (error: unknown) => {
  if (typeof window !== 'undefined') {
    window._tmpErrors = window._tmpErrors || [];
    window._tmpErrors.push(
      error instanceof Error ? error.message : 'Unknown error',
    );
  }
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      return action.payload;
    },
  },
});

export const loadTodos = () => async (dispatch: AppDispatch) => {
  try {
    const todos = await getTodos();

    dispatch(todosSlice.actions.setTodos(todos));
  } catch (error) {
    logErrorSilently(error);
  }
};

export const { setTodos } = todosSlice.actions;
export default todosSlice.reducer;
