import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { AppDispatch, RootState } from '../app/store';

const initialState = null as Todo | null;

export const currentTodoSlice: Slice<Todo | null> = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (_state, action: PayloadAction<Todo | null>) =>
      action.payload,
  },
});

export const { setCurrentTodo } = currentTodoSlice.actions;
export default currentTodoSlice.reducer;

export const findCurrentTodo =
  (id: number) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { todos } = getState();
    const searchedTodo = todos.find(todo => todo.id === id) || null;

    dispatch(setCurrentTodo(searchedTodo));
  };
