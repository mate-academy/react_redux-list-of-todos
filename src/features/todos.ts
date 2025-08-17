import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { getTodos } from '../api';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      return action.payload;
    },
  },
});

// Async action todos
export const loadTodos = () => async (dispatch: AppDispatch) => {
  try {
    const todos = await getTodos();

    dispatch(todosSlice.actions.setTodos(todos));
  } catch (error) {
    console.error('Failed to load todos:', error);
  }
};

export const { setTodos } = todosSlice.actions;
export default todosSlice.reducer;
