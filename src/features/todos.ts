import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { getTodos } from '../api';

type InitialState = {
  todos: Todo[];
  loaded: boolean;
  selectedTodo: Todo | null;
};

const initialState: InitialState = {
  todos: [],
  loaded: false,
  selectedTodo: null,
};

export const init = createAsyncThunk('todos/fetch', () => {
  return getTodos();
});

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setSelectedTodo: (state, action: PayloadAction<Todo | null>) => {
      return { ...state, selectedTodo: action.payload };
    },
  },
  extraReducers(builder) {
    builder.addCase(init.pending, state => {
      return { ...state, loaded: true };
    });

    builder.addCase(init.fulfilled, (state, action) => {
      return { ...state, todos: action.payload, loaded: false };
    });
  },
});

export default todosSlice.reducer;
export const { setSelectedTodo } = todosSlice.actions;
