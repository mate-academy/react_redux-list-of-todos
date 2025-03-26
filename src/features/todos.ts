import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: ([] as Todo[]) || [],
  reducers: {
    setTodos: (_todos, action) => [...action.payload],
  },
});
