import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { getTodos } from '../api';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const todos = await getTodos();

  return todos;
});

type TodosState = {
  items: Todo[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
};

const initialState: TodosState = {
  items: [],
  status: 'idle',
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    toggleTodo: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        items: state.items.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        items: state.items.filter(todo => todo.id !== action.payload),
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.pending, state => {
        return {
          ...state,
          status: 'loading',
        };
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        return {
          ...state,
          status: 'succeeded',
          items: action.payload,
        };
      })
      .addCase(fetchTodos.rejected, state => {
        return {
          ...state,
          status: 'failed',
        };
      });
  },
});

export const { toggleTodo, addTodo, removeTodo } = todosSlice.actions;

export default todosSlice.reducer;
