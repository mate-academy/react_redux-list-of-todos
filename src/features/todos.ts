import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { RootState } from '../app/store';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setTodos: (_, action: PayloadAction<Todo[]>) => {
      return action.payload;
    },
  },
});

export const loadedTodos = (state: RootState) => state.todos;
