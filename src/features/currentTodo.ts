import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getUser } from '../api';
import { CurrentTodo } from '../types/currentTodo';
import { Todo } from '../types/Todo';

type State = CurrentTodo | null;

export const fetchCurrentTodo = createAsyncThunk(
  'currentTodo/fetchCurrentTodo',
  async ({ todo, userId }: { todo: Todo; userId: number }) => {
    const user = await getUser(userId);

    return {
      ...todo,
      email: user.email,
      name: user.name,
    };
  },
);

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState: null as State,
  reducers: {
    reset: () => null,
  },
  extraReducers: builder => {
    builder.addCase(
      fetchCurrentTodo.fulfilled,
      (_: State, action: PayloadAction<CurrentTodo>) => {
        return action.payload;
      },
    );
  },
});

export const { reset } = currentTodoSlice.actions;
