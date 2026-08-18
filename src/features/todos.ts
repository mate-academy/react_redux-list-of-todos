// todos.ts;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Todo } from '../types/Todo';
import { getTodos } from '../api';

// Інтерфейс для стейту тудушок
export interface TodosState {
  todos: Todo[];
  loading: boolean;
}

const initialState: TodosState = {
  todos: [],
  loading: false,
};

// Асинхронна дія для завантаження тудушок
export const loadTodos = createAsyncThunk('todos/fetch', async () => {
  return getTodos();
});

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // Тут будуть твої синхронні ред'юсери
  },
  extraReducers: builder => {
    builder
      // Коли запит починається (вмикаємо лоадер)
      .addCase(loadTodos.pending, state => ({
        ...state,
        loading: true,
      }))
      // Коли завантаження успішне (зберігаємо дані і вимикаємо лоадер)
      .addCase(loadTodos.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        todos: action.payload,
      }))
      // Коли сталася помилка (просто вимикаємо лоадер)
      .addCase(loadTodos.rejected, state => ({
        ...state,
        loading: false,
      }));
  },
});

export default todosSlice.reducer;
