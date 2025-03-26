// src/features/currentTodo.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

// Стан: або якийсь Todo, або null
export type CurrentTodoState = Todo | null;

const initialState: CurrentTodoState = null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    // Явно вказуємо тип повернення: CurrentTodoState
    setCurrentTodo: (
      _state,
      action: PayloadAction<Todo | null>,
    ): CurrentTodoState => {
      if (action.payload === null) {
        return null; // «скидаємо» до null
      }

      // Якщо передано Todo, повертаємо його копію (щоб не плутати Immer)
      return {
        ...action.payload,
      };
    },
  },
});

export const { setCurrentTodo } = currentTodoSlice.actions;
